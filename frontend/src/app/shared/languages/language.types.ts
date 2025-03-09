export interface RandomNumberAudioRequest {
    range: {
        min: number;
        max: number;
    },
    languageCode: string;
    voiceName?: string;
}