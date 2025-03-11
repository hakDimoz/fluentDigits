import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [],
  templateUrl: './audio.component.html',
})
export class AudioComponent {
  environment = environment;
  audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audioRef');

  audioUrl = input.required<string | undefined>();
  src = computed(() => `${this.environment.apiURL + this.audioUrl()}`);
  isPlaying = signal<boolean>(false);

  togglePlay() {
    const audio = this.audioRef().nativeElement;

    if (audio.paused) {
      audio.play();
      this.isPlaying.set(true);
    } else {
      audio.pause();
      this.isPlaying.set(false);
    }
  }

  onEnded() {
    this.isPlaying.set(false);
  }


}
