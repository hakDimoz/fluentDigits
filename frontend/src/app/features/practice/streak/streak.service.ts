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
  maxTimeToReset = signal(5);
  remainingTimeSeconds = signal(0);
  remainingTimePercentage = computed(
    () => (this.remainingTimeSeconds() / this.maxTimeToReset()) * 100
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
    }) 
  }
  incrementStreak() {
    this.clearTimers();

    this.streak.update((streak) => streak + 1);
    this.longestStreak.update((longestStreak) =>
      Math.max(longestStreak, this.streak())
    );
  }

  startTimer() {
    // Reset remaining time

    // Countdown every second
    this.intervalId = setInterval(() => {
      if (this.remainingTimeSeconds() > 0) {
        this.remainingTimeSeconds.set(this.remainingTimeSeconds() - 1);
      }
    }, 1000);

    // Reset streak if no input
    this.timeoutId = setTimeout(() => {
      const currentStreak = this.streak();

      if (currentStreak === this.streak()) {
        this.resetStreak();
      }
    }, 1000 * this.maxTimeToReset());
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
    this.remainingTimeSeconds.set(this.maxTimeToReset());
  }
}
