import { Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import { Guess } from '../guess.types';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-guessed-number',
  standalone: true,
  imports: [],
  templateUrl: './guessed-number.component.html',
  host: {
    '(click)': 'playAudio()'
  }
})
export class GuessedNumberComponent {
  environment = environment;
  guessedNumber = input.required<Guess>();
  audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audioRef');
  src = computed(() => `${this.environment.apiURL + this.guessedNumber().audio}`);

  playAudio() { 
    const audio = this.audioRef().nativeElement;
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play();
  }
}
