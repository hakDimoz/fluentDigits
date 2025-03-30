import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { PracticeService } from '../practice.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class StreakService {
  practiceService = inject(PracticeService);
  streak = signal(0);
  longestStreak = signal(0);
  maxTimeToReset = signal(5000);
  remainingTimeMilliseconds = signal(0);
  remainingTimePercentage = computed(
    () => (this.remainingTimeMilliseconds() / this.maxTimeToReset()) * 100
  );

  private timeoutId: any = null;
  private intervalId: any = null;

  constructor() {
    // Start timer when the user can guess
    toObservable(this.practiceService.canGuess).subscribe((canGuess) => {
      console.log('canGuess', canGuess);
      if (canGuess && this.streak() > 0) {
        this.startTimer();
      }
    });
  }
  incrementStreak() {
    this.clearTimers();

    this.streak.update((streak) => streak + 1);
    this.longestStreak.update((longestStreak) =>
      Math.max(longestStreak, this.streak())
    );
  }

  startTimer() {
    // Countdown every 10 milliseconds
    this.intervalId = setInterval(() => {
      if (this.remainingTimeMilliseconds() > 0) {
        this.remainingTimeMilliseconds.set(
          this.remainingTimeMilliseconds() - 10
        );
      } else {
        this.resetStreak();
      }
    }, 10);

    // // Reset streak if no input
    // this.timeoutId = setTimeout(() => {
    //   const currentStreak = this.streak();

    //   if (currentStreak === this.streak()) {
    //     this.resetStreak();
    //   }
    // }, 1000 * this.maxTimeToReset());
  }

  resetStreak() {
    this.streak.set(0);
    this.clearTimers();
  }

  clearTimers() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.intervalId) clearInterval(this.intervalId);

    this.timeoutId = null;
    this.intervalId = null;
    this.remainingTimeMilliseconds.set(this.maxTimeToReset());
  }
}
