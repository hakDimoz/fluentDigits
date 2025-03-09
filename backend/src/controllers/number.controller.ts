import {
	getRandomNumberSpeechRequest,
	getRandomNumbersSpeechRequest,
} from "../types/number.model";
import { Request, Response } from "express";
import { convertTextToSpeech, listVoices } from "../utilities/google-api";
import {
	ConvertTextToSpeechRequest,
	ListVoicesRequest,
} from "../types/text-to-speech.model";
import { LanguageOption, VoiceOption } from "../../../shared/language.types";

// Language map (convert "fr-FR" → "French (France)")
export const languageMap = {
	"af-ZA": "Afrikaans (South Africa)",
	"am-ET": "Amharic (Ethiopia)",
	"ar-XA": "Arabic",
	"bg-BG": "Bulgarian (Bulgaria)",
	"bn-IN": "Bengali (India)",
	"ca-ES": "Catalan (Spain)",
	"cmn-CN": "Chinese (Mandarin, Simplified)",
	"cmn-TW": "Chinese (Mandarin, Traditional)",
	"cs-CZ": "Czech (Czech Republic)",
	"da-DK": "Danish (Denmark)",
	"de-DE": "German (Germany)",
	"el-GR": "Greek (Greece)",
	"en-AU": "English (Australia)",
	"en-GB": "English (United Kingdom)",
	"en-IN": "English (India)",
	"en-US": "English (United States)",
	"es-ES": "Spanish (Spain)",
	"es-US": "Spanish (United States)",
	"et-EE": "Estonian (Estonia)",
	"eu-ES": "Basque (Spain)",
	"fi-FI": "Finnish (Finland)",
	"fil-PH": "Filipino (Philippines)",
	"fr-CA": "French (Canada)",
	"fr-FR": "French (France)",
	"gl-ES": "Galician (Spain)",
	"gu-IN": "Gujarati (India)",
	"he-IL": "Hebrew (Israel)",
	"hi-IN": "Hindi (India)",
	"hu-HU": "Hungarian (Hungary)",
	"id-ID": "Indonesian (Indonesia)",
	"is-IS": "Icelandic (Iceland)",
	"it-IT": "Italian (Italy)",
	"ja-JP": "Japanese (Japan)",
	"kn-IN": "Kannada (India)",
	"ko-KR": "Korean (South Korea)",
	"lt-LT": "Lithuanian (Lithuania)",
	"lv-LV": "Latvian (Latvia)",
	"ml-IN": "Malayalam (India)",
	"mr-IN": "Marathi (India)",
	"ms-MY": "Malay (Malaysia)",
	"nb-NO": "Norwegian Bokmål (Norway)",
	"nl-BE": "Dutch (Belgium)",
	"nl-NL": "Dutch (Netherlands)",
	"pa-IN": "Punjabi (India)",
	"pl-PL": "Polish (Poland)",
	"pt-BR": "Portuguese (Brazil)",
	"pt-PT": "Portuguese (Portugal)",
	"ro-RO": "Romanian (Romania)",
	"ru-RU": "Russian (Russia)",
	"sk-SK": "Slovak (Slovakia)",
	"sr-RS": "Serbian (Serbia)",
	"sv-SE": "Swedish (Sweden)",
	"ta-IN": "Tamil (India)",
	"te-IN": "Telugu (India)",
	"th-TH": "Thai (Thailand)",
	"tr-TR": "Turkish (Turkey)",
	"uk-UA": "Ukrainian (Ukraine)",
	"ur-IN": "Urdu (India)",
	"vi-VN": "Vietnamese (Vietnam)",
	"yue-HK": "Cantonese (Hong Kong)",
};

export const getRandomNumberSpeech = async (req: Request, res: Response) => {
	try {
		const data: getRandomNumberSpeechRequest = req.body;

		const randomNumber = Math.floor(
			Math.random() * (data.range.max - data.range.min + 1) +
				data.range.min
		);

		const request: ConvertTextToSpeechRequest = {
			text: randomNumber.toString(),
			languageCode: data.languageCode,
			voiceName: data.voiceName ?? "",
		};

		const audioFilePath = await convertTextToSpeech(request);
		res.status(200).json({ audio: audioFilePath });
	} catch (error) {
		console.error(error, "Error generating speech");
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

export const getVoicesList = async (req: Request, res: Response) => {
	try {
		const data: ListVoicesRequest = req.body;
		const request = {
			languageCode: data.languageCode,
		};

		const result = await listVoices(request);

		const groupedVoices: { [key: string]: LanguageOption } = {};

		result.forEach((voice: any) => {
			const langCode = voice.languageCodes[0];

			if (!groupedVoices[langCode]) {
				groupedVoices[langCode] = {
					code: langCode,
					name:
						languageMap[langCode as keyof typeof languageMap] ||
						langCode, // Convert to readable name
					voices: [],
				};
			}

			groupedVoices[langCode].voices.push({
				name: voice.name,
				gender: voice.ssmlGender,
				sampleRate: voice.naturalSampleRateHertz,
			} as VoiceOption);
		});

		res.status(200).json(Object.values(groupedVoices));
	} catch (error) {
		console.error(error, "Error generating voices list");
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};
