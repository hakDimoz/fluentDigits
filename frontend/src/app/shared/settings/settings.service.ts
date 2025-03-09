import { Injectable, signal } from '@angular/core';
import { LanguageOption } from '@shared/language.types';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private languageOption = signal<LanguageOption | null>(null);
  private numberRange = signal<string | null>(null);

  getLanguageOption() { 
    return this.languageOption();
  }

  getNumberRange() {
    return this.numberRange();
  }

  setLanguageOption(language: LanguageOption | null) { 
    this.languageOption.set(language);
  }

  setNumberRange(range: string | null) {
    this.numberRange.set(range);
  }
}
