export interface VoiceOption {
  name: string;
  gender: "FEMALE" | "MALE";
  sampleRate: number;
}

export interface LanguageOption {
  code: string;
  name: string;
  voices: VoiceOption[];
}
