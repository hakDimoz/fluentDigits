import { effect, Injectable, signal } from '@angular/core';
import { LanguageOption } from '@shared/language.types';
import { KeybindOption, NumberRange, SettingOptions } from './settings.types';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  selectedLanguage = signal<LanguageOption>({
    code: 'en-US',
    name: 'English',
    voices: [],
  });
  selectedNumberRange = signal<NumberRange>({ min: 0, max: 10 });
  keybinds = signal<Record<KeybindOption, string>>({
    [KeybindOption.ToggleAudio]: 'Space',
    [KeybindOption.GuessQuestion]: 'Enter',
    [KeybindOption.SkipQuestion]: 'S',
    [KeybindOption.MuteAudio]: 'M',
  });

  constructor() {
    effect(() => {
      console.log('Language Option:', this.selectedLanguage());
      console.log('Number Range:', this.selectedNumberRange());
    });
  }

  getKeybind(keybindOption: KeybindOption) {
    return this.keybinds()[keybindOption];
  }

  setKeybind(keybindOption: KeybindOption, keybind: string) {
    this.keybinds.set({
      ...this.keybinds(),
      [keybindOption]: keybind,
    });
  }
}
