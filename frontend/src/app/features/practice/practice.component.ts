import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LanguagesService } from '../../shared/languages/languages.service';
import { FormsModule } from '@angular/forms';
import { GuessComponent } from './guess/guess.component';
import { Question } from './practice.types';
import { AudioComponent } from "./audio/audio.component";

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [FormsModule, GuessComponent, AudioComponent],
  templateUrl: './practice.component.html',
})
export class PracticeComponent implements OnInit {
  languagesService = inject(LanguagesService);

  currentQuestion = signal<Question | undefined>(undefined);
  currentLanguage = signal<string | undefined>(undefined);
  currentVoice = signal<string | undefined>(undefined);
  isLoading = computed(() => !this.currentQuestion());

  ngOnInit() {
    this.getNewQuestion();
  }

  getNewQuestion() {
    this.languagesService.getRandomNumberAudio(0, 10, 'en-US').subscribe({
      next: (response) => {
        this.currentQuestion.set(response);
        console.log(this.currentQuestion());
      },
      error: (error) => console.error(error.message),
    });
  }

  onGuessed() {
    this.getNewQuestion();
  }
}
