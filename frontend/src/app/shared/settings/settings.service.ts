import { effect, Injectable, signal } from '@angular/core';
import { LanguageOption } from '@shared/language.types';
import { NumberRange, SettingOptions } from './settings.types';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  selectedLanguage = signal<LanguageOption>({ code: 'en-US', name: 'English', voices: [] });
  selectedNumberRange = signal<NumberRange>({ min: 0, max: 10 });

  constructor() {
    effect(() => {
      console.log('Language Option:', this.selectedLanguage());
      console.log('Number Range:', this.selectedNumberRange());
    })
  }
}
