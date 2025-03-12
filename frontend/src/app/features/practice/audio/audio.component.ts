import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  OnChanges,
  signal,
  SimpleChanges,
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

  //TODO: Maybe not on src change but just on guess and skip press
  constructor() {
    effect(() => {
      const newSrc = this.src();
      console.log("prague")
      if (newSrc) {
        queueMicrotask(() => this.play()); 
      }
    });
  }

  togglePlay() {
    const audio = this.audioRef().nativeElement;

    if (audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.audioRef().nativeElement.play();
    this.isPlaying.set(true);
  }

  pause() {
    this.audioRef().nativeElement.pause();
    this.isPlaying.set(false);
  }

  onEnded() {
    this.isPlaying.set(false);
  }
}
