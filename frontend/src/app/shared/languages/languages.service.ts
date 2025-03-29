import { HttpClient } from '@angular/common/http';
import {  computed, inject, Injectable, signal } from '@angular/core';
import { LanguageOption } from '@shared/language.types';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private apiURL = `${environment.apiURL}/api/number`;
  private http = inject(HttpClient);

  languages = signal<LanguageOption[]>([]);
  isLoading = computed(() => this.languages().length === 0);

  constructor() {
    this.getLanguages();
  }

  private getLanguages() {
    this.http
      .get<LanguageOption[]>(`${this.apiURL}/voices`)
      .subscribe((languages) => {
        this.languages.set(languages);
      });

  }

}
