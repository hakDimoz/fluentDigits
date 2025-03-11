import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LanguagesService } from '../../shared/languages/languages.service';
import { FormsModule } from '@angular/forms';
import { GuessComponent } from "./guess/guess.component";
import { Question } from './practice.types';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [FormsModule, GuessComponent],
  templateUrl: './practice.component.html',
})
export class PracticeComponent implements OnInit {
  languagesService = inject(LanguagesService);

  isLoading = computed(() => !this.currentQuestion());
  currentQuestion = signal<Question | undefined>(undefined)
  currentLanguage = signal<string | undefined>(undefined);
  currentVoice = signal<string | undefined>(undefined);

  ngOnInit() { 
    // this.getNewQuestion();
  }

  getNewQuestion(){
    this.languagesService.getRandomNumberAudio(0, 100, 'en-US').subscribe({
      next: (response) => {
        this.currentQuestion.set(response);
      },
      error: (error) => console.error(error.message),
    })
  }

  onGuessed() {
    this.getNewQuestion();
    console.log(this.currentQuestion());
  }

}
