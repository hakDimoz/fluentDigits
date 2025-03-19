import { LanguageOption } from '@shared/language.types';

export interface SettingOptions {
  languageOption: LanguageOption | null;
  numberRange: NumberRange;
}

export interface NumberRange {
  min: number;
  max: number;
}

export enum KeybindOption {
  ToggleAudio = 'Toggle Audio',
  GuessQuestion = 'Guess Question',
  SkipQuestion = 'Skip Question',
  MuteAudio = 'Mute Audio',
}
