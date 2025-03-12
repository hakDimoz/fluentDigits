import textToSpeech from "@google-cloud/text-to-speech";
import {
	ConvertTextToSpeechRequest,
	ListVoicesRequest,
} from "../types/text-to-speech.model";
import path from "path";
import fs from "fs";
import { mkdir } from "node:fs/promises";
import { access, constants, existsSync } from "node:fs";



const client = new textToSpeech.TextToSpeechClient({
	keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export const convertTextToSpeech = async (data: ConvertTextToSpeechRequest) => {
	try {
		const request = {
			input: { text: data.text },
			voice: { languageCode: data.languageCode, name: data.voiceName },
			audioConfig: { audioEncoding: "MP3" as const },
		};

		//TODO: output file name should be number and check if it already exists, if so return the existing file
		// Check if number already exists

		const outputFileName = `${data.text}.mp3`;
		const outputDir = path.join(
			__dirname,
			"..",
			"public",
			"audio",
			data.languageCode
		);
		const outputFilePath = path.join(outputDir, outputFileName);

		await mkdir(outputDir, { recursive: true });

		// Check if file already exists
		access(outputFilePath, constants.F_OK, (err) => {
			if (!err) {
				// File exists, return the existing file path
				return `/audio/${data.languageCode}/${outputFileName}`;
			}
		});

		// Generate new audio file
		const [response] = await client.synthesizeSpeech(request);

		await writeFileAsync(outputFilePath, response.audioContent).catch(
			(err) => {
				console.error(err, "Error writing audio file");
				throw err;
			}
		);

		return `/audio/${data.languageCode}/${outputFileName}`;
	} catch (error) {
		console.error(error, "Error converting text to speech");
		throw error;
	}
};

export const listVoices = async (data: ListVoicesRequest) => {
	try {
		const [result] = await client.listVoices({languageCode: data.languageCode});
		const voices = result.voices!;

		// Filter by Standard voices
		const standardVoices = voices.filter((voice) =>
			voice.name!.includes("Standard")
		);

		return standardVoices;
	} catch (error) {
		console.error(error, "Error listing voices");
		throw error;
	}
};

function writeFileAsync(filePath: string, data: any) {
	return new Promise<void>((resolve, reject) => {
		fs.writeFile(filePath, data, "binary", (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}
