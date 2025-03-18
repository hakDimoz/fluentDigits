import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, OnInit, signal } from '@angular/core';
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
  private http = inject(HttpClient);

  languages = signal<LanguageOption[]>([]);

  constructor() {
    this.getLanguages();
    effect(() => {
      console.log(this.languages());
    });
  }

  private getLanguages() {
    this.http
      .get<LanguageOption[]>(`${this.apiURL}/voices`)
      .subscribe((languages) => {
        this.languages.set(languages);
      });
  }
}
