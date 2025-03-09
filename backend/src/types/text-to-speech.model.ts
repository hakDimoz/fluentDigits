export interface ConvertTextToSpeechRequest { 
    text: string,
    languageCode: string,
    voiceName: string
}

export interface ListVoicesRequest { 
    languageCode?: string
}