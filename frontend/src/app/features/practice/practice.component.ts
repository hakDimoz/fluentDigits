import { Component, computed, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { LanguagesService } from '../../shared/languages/languages.service';
import { FormsModule } from '@angular/forms';
import { GuessComponent } from './guess/guess.component';
import { Question } from './practice.types';
import { AudioComponent } from './audio/audio.component';
import { SettingsComponent } from '../../shared/settings/settings.component';
import { StreakComponent } from './streak/streak.component';
import { PracticeService } from './practice.service';
import { SettingsService } from '../../shared/settings/settings.service';
import { queue } from 'rxjs';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    FormsModule,
    GuessComponent,
    AudioComponent,
    SettingsComponent,
    StreakComponent,
  ],
  templateUrl: './practice.component.html',
})
export class PracticeComponent implements OnInit {
  practiceService = inject(PracticeService);
  settingsService = inject(SettingsService);

  currentQuestion = this.practiceService.currentQuestion;
  isLoading = computed(() => !this.currentQuestion());

  selectedNumberRange = this.settingsService.selectedNumberRange;
  selectedLanguage = this.settingsService.selectedLanguage;
  playAudioEvent = signal<number>(0);

  constructor() {
    // Get the audio to play when the component is initialized
    effect(() => {
      this.currentQuestion();
      queueMicrotask(() => {
        this.playAudioEvent.set(this.playAudioEvent() + 1);
      })

    }) 
  }

  ngOnInit() {
    this.getNewQuestion();
  }

  getNewQuestion() {
    this.practiceService.setNewQuestion(this.selectedNumberRange().min, this.selectedNumberRange().max, this.selectedLanguage()!.code);
  }
}
