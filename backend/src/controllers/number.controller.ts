import {
	getRandomNumberSpeechRequest,
	getRandomNumbersSpeechRequest,
} from "../types/number.model";
import { Request, Response } from "express";
import textToSpeech from "@google-cloud/text-to-speech";
import { convertTextToSpeech } from "../utilities/google-api";
import { convertTextToSpeechRequest } from "../types/text-to-speech.model";

export const getRandomNumbersSpeech = async (req: Request, res: Response) => {
	const data: getRandomNumbersSpeechRequest = req.body;

	// generate random numbers
	const randomNumbers: number[] = [];
	for (let i = 0; i < data.amount; i++) {
		randomNumbers.push(
			Math.floor(Math.random() * (data.range.max - data.range.min + 1)) +
				data.range.min
		);
	}

	// generate speech

	res.status(200).json(randomNumbers);
};

export const getRandomNumberSpeech = async (req: Request, res: Response) => {
	const data: getRandomNumberSpeechRequest = req.body;

	const randomNumber = Math.floor(
		Math.random() * (data.range.max - data.range.min + 1) + data.range.min
	);

	const request: convertTextToSpeechRequest = {
		text: randomNumber.toString(),
		languageCode: data.languageCode,
		voiceName: data.voiceName ?? "",
	};

	try {
		const audioFilePath = await convertTextToSpeech(request);
		res.status(200).json({ audio: audioFilePath });

	} catch (error) {
		console.error(error, "Error generating speech");
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};
