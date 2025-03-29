import { Component, computed, inject } from '@angular/core';
import { StreakService } from './streak.service';

@Component({
  selector: 'app-streak',
  standalone: true,
  imports: [],
  templateUrl: './streak.component.html',
})
export class StreakComponent {
  streakService = inject(StreakService);
  streak = computed(() => this.streakService.streak());
  remainingTimePercentage = computed(() => this.streakService.remainingTimePercentage());
  longestStreak = computed(() => this.streakService.longestStreak());

}
