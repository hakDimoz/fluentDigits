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

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [],
  templateUrl: './audio.component.html',
  host: {
    '(document:keydown)': 'handleKeyPress($event)',
  },
})
export class AudioComponent implements OnInit {
  environment = environment;
  audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audioRef');
  audioService = inject(AudioService);
  settingsService = inject(SettingsService);

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

    this.play();
    this.audioService.isLoadingAudio.set(false);

    setTimeout(() => {
      this.audioService.hasPlayedOnce.set(true);
      console.log('has played once: ', this.audioService.hasPlayedOnce());
    }, audio.duration * 1000);
  }

  onLoadStart() {
    this.audioService.isLoadingAudio.set(true);
  }
}
