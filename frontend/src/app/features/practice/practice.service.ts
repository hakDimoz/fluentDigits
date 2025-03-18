import { inject, Injectable, signal } from '@angular/core';
import { Question } from './practice.types';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private apiURL = `${environment.apiURL}/api/number`;
  private http = inject(HttpClient);

  currentQuestion = signal<Question | undefined>(undefined);

  setNewQuestion(
    min: number,
    max: number,
    languageCode: string,
    voiceName?: string
  ) {
    this.http
      .get<Question>(
        `${
          this.apiURL
        }/random?min=${min}&max=${max}&languageCode=${languageCode}${
          voiceName ? '&voiceName=' + voiceName : ''
        }`
      )
      .subscribe((question) => {
        this.currentQuestion.set(question);
      });
  }
}
