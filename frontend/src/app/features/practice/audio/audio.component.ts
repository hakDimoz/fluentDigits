import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  untracked,
  viewChild,
} from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AudioService } from './audio.service';
import { SettingsService } from '../../../shared/settings/settings.service';
import { KeybindOption } from '../../../shared/settings/settings.types';
import { InteractionService } from '../../../shared/interaction/interaction.service';
import { TooltipComponent } from "../../../shared/tooltip/tooltip.component";

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [TooltipComponent],
  templateUrl: './audio.component.html',
  host: {
    '(document:keydown)': 'handleKeyPress($event)',
  },
})
export class AudioComponent implements OnInit {
  readonly KeybindOption = KeybindOption;
  environment = environment;
  audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audioRef');
  interactionService = inject(InteractionService);
  audioService = inject(AudioService);
  settingsService = inject(SettingsService);

  userHasInteractedWithPage = computed(() =>
    this.interactionService.hasInteracted()
  );
  audioUrl = input.required<string | undefined>();
  src = computed(() => `${this.environment.apiURL + this.audioUrl()}`);
  isPlaying = signal<boolean>(false);

  ngOnInit(): void {
    this.audioService.setAudioElement(this.audioRef().nativeElement);
  }

  togglePlay() {
    const audio = this.audioRef().nativeElement;

    if (audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (this.settingsService.isModalOpen()) return;

    const keybind = this.settingsService.getKeybind(KeybindOption.RestartAudio);
    if (event.key !== keybind) return;

    // Play from start
    const audio = this.audioRef().nativeElement;
    audio.currentTime = 0; // Reset the audio to the beginning
    this.play();
  }

  play() {
    this.audioRef().nativeElement.play();
    this.isPlaying.set(true);
    this.audioService.isPlaying.set(true);

    if (!this.audioService.hasPlayedOnce()) {
      this.audioService.hasPlayedOnce.set(true);
    }
  }

  pause() {
    this.audioRef().nativeElement.pause();
    this.isPlaying.set(false);
    this.audioService.isPlaying.set(false);
  }

  onEnded() {
    this.isPlaying.set(false);
    this.audioService.isPlaying.set(false);
  }

  onMetadataLoaded(event: Event) {
    const audio = event.target as HTMLAudioElement;

    this.audioService.isLoadingAudio.set(false);

    // Autoplays if the user has interacted with the page
    if (this.userHasInteractedWithPage()) {
      this.play();
      setTimeout(() => {
        this.audioService.hasPlayedOnce.set(true);
      }, audio.duration * 1000);
    }
  }

  onLoadStart() {
    this.audioService.isLoadingAudio.set(true);
  }
}
