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
  RestartAudio = 'Restart Audio',
  GuessQuestion = 'Guess Question',
  SkipQuestion = 'Skip Question',
  MuteAudio = 'Mute Audio',
}
