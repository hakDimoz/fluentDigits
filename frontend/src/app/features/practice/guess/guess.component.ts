import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guess } from './guess.types';
import { Question } from '../practice.types';
import { PracticeService } from '../practice.service';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guess.component.html',
})
export class GuessComponent {
  practiceService = inject(PracticeService);
  currentQuestion = this.practiceService.currentQuestion;
  guessed = output();

  guess = signal<number | undefined>(undefined);
  guessedNumbers = signal<Guess[]>([]);
  reversedGuessedNumbers = computed(() =>
    this.guessedNumbers().slice().reverse()
  );
  isCorrect = signal<boolean | undefined>(undefined);

  onGuess() {
    if (this.guess() === this.currentQuestion()!.number) {
      this.addGuessToGuessedNumbers({
        ...this.currentQuestion()!,
        correct: true,
      });

      this.isCorrect.set(true);
      this.clearGuessInput();
      this.guessed.emit();
      return;
    }

    this.isCorrect.set(false);
  }

  onSkip() {
    this.addGuessToGuessedNumbers({
      ...this.currentQuestion()!,
      correct: false,
    });
    this.guessed.emit();
  }

  clearGuessInput() {
    this.guess.set(undefined);
  }

  addGuessToGuessedNumbers(guess: Guess) {
    this.guessedNumbers.set([...this.guessedNumbers(), guess]);
  }
}
