export interface getRandomNumbersSpeechRequest {
	amount: number;
	range: { min: number; max: number };
	language: string;
}

export interface getRandomNumberSpeechRequest { 
	range: { min: number; max: number };
	languageCode: string;
	voiceName: string;
}