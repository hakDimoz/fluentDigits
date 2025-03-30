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
import { SettingsService } from '../../../shared/settings/settings.service';
import { KeybindOption } from '../../../shared/settings/settings.types';
import { StreakService } from '../streak/streak.service';
import { AudioService } from '../audio/audio.service';
import { GuessedNumberComponent } from "./guessed-number/guessed-number.component";

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [FormsModule, GuessedNumberComponent],
  templateUrl: './guess.component.html',
  host: {
    '(window:keydown)': 'handleKeyPress($event)',
  }
})
export class GuessComponent {
  practiceService = inject(PracticeService);
  settingsService = inject(SettingsService);
  streakService = inject(StreakService);
  audioService = inject(AudioService);
  currentQuestion = this.practiceService.currentQuestion;
  guessed = output();

  guess = signal<number | undefined>(undefined);
  guessedNumbers = signal<Guess[]>([]);
  reversedGuessedNumbers = computed(() =>
    this.guessedNumbers().slice().reverse()
  );
  isCorrect = signal<boolean | undefined>(undefined);

  onGuess() {
    if (!this.practiceService.canGuess()) return;

    if (this.guess() === this.currentQuestion()!.number) {
      this.addGuessToGuessedNumbers({
        ...this.currentQuestion()!,
        correct: true,
      });

      this.isCorrect.set(true);
      this.clearGuessInput();
      this.guessed.emit();
      this.streakService.incrementStreak();

      return;
    }

    this.streakService.resetStreak();
    this.isCorrect.set(false);
  }

  onSkip() {
    if (!this.practiceService.canGuess()) return;


    this.addGuessToGuessedNumbers({
      ...this.currentQuestion()!,
      correct: false,
    });

    this.streakService.resetStreak();
    this.guessed.emit();
  }

  clearGuessInput() {
    this.guess.set(undefined);
  }

  addGuessToGuessedNumbers(guess: Guess) {
    this.guessedNumbers.set([...this.guessedNumbers(), guess]);
  }

  handleKeyPress(event: KeyboardEvent) {
    if (this.settingsService.isModalOpen()) return;

    const guessKeybind = this.settingsService.getKeybind(
      KeybindOption.GuessQuestion
    );
    const skipKeybind = this.settingsService.getKeybind(
      KeybindOption.SkipQuestion
    );

    if (event.key !== guessKeybind && event.key !== skipKeybind) return;

    switch (event.key) {
      case guessKeybind:
        this.onGuess();
        break;
      case skipKeybind:
        this.onSkip();
        break;
    }
  }
}
