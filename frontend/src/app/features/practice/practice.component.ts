import { Component, inject, OnInit, signal } from '@angular/core';
import { LanguagesService } from '../../shared/languages/languages.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './practice.component.html',
})
export class PracticeComponent implements OnInit {
  languagesService = inject(LanguagesService);

  currentNumber = signal<number | undefined>(undefined);
  currentAudio = signal<string | undefined>(undefined);
  currentLanguage = signal<string | undefined>(undefined);
  currentVoice = signal<string | undefined>(undefined);
  guess = signal<number | undefined>(undefined);
  isCorrect = signal<boolean | undefined>(undefined);

  ngOnInit() { 
    // this.languagesService.getRandomNumberAudio(0, 100, 'en-US').subscribe({
    //   next: (response) => {
    //     this.currentNumber.set(response.number);
    //     this.currentAudio.set(response.audio);
    //   },
    //   error: (error) => console.error(error.message),
    // })
  }

  onGuess() {
    if (this.guess() === this.currentNumber()) {
      this.isCorrect.set(true);
      return;
    }

    this.isCorrect.set(false);
  }

}
