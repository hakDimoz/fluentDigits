import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LanguageOption } from '@shared/language.types';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RandomNumberAudioRequest } from './language.types';
import { Question } from '../../features/practice/practice.types';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private apiURL = `${environment.apiURL}/api/number`;
  private baseURL = environment.apiURL;

  private http = inject(HttpClient);
  private cachedLanguages: LanguageOption[] | null = null;

  getRandomNumberAudio(
    min: number,
    max: number,
    languageCode: string,
    voiceName?: string
  ): Observable<Question> {
    return this.http.get<{ number: number; audio: string }>(
      `${this.apiURL}/random?min=${min}&max=${max}&languageCode=${languageCode}${
        voiceName ? '&voiceName=' + voiceName : ''
      }`
    );
  }

  getLanguages(): Observable<LanguageOption[]> {
    if (this.cachedLanguages) {
      return of(this.cachedLanguages);
    }

    return this.http
      .get<LanguageOption[]>(`${this.apiURL}/voices`)
      .pipe(tap((languages) => (this.cachedLanguages = languages)));
  }
}
