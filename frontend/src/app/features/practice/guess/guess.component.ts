import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guess } from './guess.types';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guess.component.html',
})
export class GuessComponent {
  currentNumber = input.required<number>();
  guessed = output();

  guess = signal<number | undefined>(undefined);
  guessedNumbers = signal<Guess[]>([]);
  isCorrect = signal<boolean | undefined>(undefined);

  onGuess() {
    if (this.guess() === this.currentNumber()) {
      this.isCorrect.set(true);
    } else {
      this.isCorrect.set(false);
    }

    this.guessed.emit();
  }

  onSkip() {
    this.guessed.emit();
  }
}
