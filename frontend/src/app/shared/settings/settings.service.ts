import { computed, effect, Injectable, signal } from '@angular/core';
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
  defaultKeybinds: Record<KeybindOption, string> = {
    [KeybindOption.RestartAudio]: 'r',
    [KeybindOption.GuessQuestion]: 'Enter',
    [KeybindOption.SkipQuestion]: 's',
    [KeybindOption.MuteAudio]: 'm',
  };

  keybinds = signal<Record<KeybindOption, string>>({
    [KeybindOption.RestartAudio]: 'r',
    [KeybindOption.GuessQuestion]: 'Enter',
    [KeybindOption.SkipQuestion]: 's',
    [KeybindOption.MuteAudio]: 'm',
  });
  keybindsArray = computed<[KeybindOption, string][]>(() => {
    const record = this.keybinds();
    return Object.entries(record).map(
      ([key, value]) => [key as KeybindOption, value],
      []
    ) as [KeybindOption, string][];
  });
  isListeningForKeys = signal(false);
  isModalOpen = signal<boolean>(false);

  constructor() {
    effect(() => {
      console.log(this.keybindsArray())
    })
  }
  getKeybind(keybindOption: KeybindOption) {
    return this.keybinds()[keybindOption];
  }

  updateKeybind(keybindOption: KeybindOption, keybind: string) {
    this.keybinds.update((kb) => ({ ...kb, [keybindOption]: keybind }));
  }
}
