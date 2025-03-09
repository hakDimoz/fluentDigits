import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LanguageOption } from '@shared/language.types';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RandomNumberAudioRequest } from './language.types';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private apiURL = `${environment.apiURL}/api/number`;
  private baseURL = environment.apiURL;

  private http = inject(HttpClient);
  private cachedLanguages: LanguageOption[] | null = null;

  getRandomNumberAudio(request: RandomNumberAudioRequest) {
    return this.http
      .get<{ audio: string }>(
        `${this.apiURL}/random` 
      )
      .pipe(map((response) => this.baseUrl + response.audio));
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
