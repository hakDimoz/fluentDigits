import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
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
import { VolumeComponent } from './audio/volume/volume.component';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    FormsModule,
    GuessComponent,
    AudioComponent,
    SettingsComponent,
    StreakComponent,
    VolumeComponent,
  ],
  templateUrl: './practice.component.html',
})
export class PracticeComponent implements OnInit, OnDestroy {
  practiceService = inject(PracticeService);
  settingsService = inject(SettingsService);

  currentQuestion = this.practiceService.currentQuestion;
  isLoading = computed(() => !this.currentQuestion());
  isFirstLoad = computed(() => this.practiceService.isFirstLoad());

  selectedNumberRange = this.settingsService.selectedNumberRange;
  selectedLanguage = this.settingsService.selectedLanguage;

  ngOnInit() {
    this.getNewQuestion();
  }

  ngOnDestroy(): void {
    this.practiceService.currentQuestion.set(undefined);
  }

  getNewQuestion() {
    this.practiceService.setNewQuestion(
      this.selectedNumberRange().min,
      this.selectedNumberRange().max,
      this.selectedLanguage()!.code
    );
  }
}
