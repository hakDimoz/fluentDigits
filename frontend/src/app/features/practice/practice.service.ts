import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Question } from './practice.types';
import { HttpClient } from '@angular/common/http';
import { AudioService } from './audio/audio.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PracticeService {
  private apiURL = `${environment.apiURL}/api/number`;
  private http = inject(HttpClient);
  audioService = inject(AudioService);

  currentQuestion = signal<Question | undefined>(undefined);
  canGuess = computed(() => {
    return (
      !!this.currentQuestion &&
      !this.audioService.isLoadingAudio() &&
      this.audioService.hasPlayedOnce()
    );
  });
  isFirstLoad = signal(true);


  setNewQuestion(
    min: number,
    max: number,
    languageCode: string,
    voiceName?: string
  ) {
    this.currentQuestion.set(undefined);
    this.audioService.hasPlayedOnce.set(false);

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
        this.isFirstLoad.set(false);
      });
  }
}
