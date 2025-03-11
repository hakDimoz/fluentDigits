import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guess } from './guess.types';
import { Question } from '../practice.types';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guess.component.html',
})
export class GuessComponent {
  currentQuestion = input.required<Question>();
  guessed = output();

  guess = signal<number | undefined>(undefined);
  guessedNumbers = signal<Guess[]>([]);
  isCorrect = signal<boolean | undefined>(undefined);

  onGuess() {
    console.log('guess', this.guess());
    if (this.guess() === this.currentQuestion().number) {
      this.isCorrect.set(true);
      this.guessedNumbers.set([
        ...this.guessedNumbers(),
        { number: this.currentQuestion().number, audio: this.currentQuestion().audio, correct: true },
      ]);

      this.guessed.emit();
      return;
    }

    this.isCorrect.set(false);
    console.log(this.isCorrect());
  }

  onSkip() {
    this.guessedNumbers.set([
      ...this.guessedNumbers(),
      { number: this.currentQuestion().number, audio: this.currentQuestion().audio, correct: false },
    ]);
    this.guessed.emit();
  }
}
