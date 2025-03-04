import { Request, Response } from "express";
import textToSpeech from "@google-cloud/text-to-speech";
import { writeFile } from "node:fs/promises";
import { convertTextToSpeechRequest } from "../types/text-to-speech.model";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const client = new textToSpeech.TextToSpeechClient();

export const convertTextToSpeech = async (data: convertTextToSpeechRequest) => {
	try {
		const request = {
			input: { text: data.text },
			voice: { languageCode: data.languageCode, name: data.voiceName },
			audioConfig: { audioEncoding: "MP3" as const },
		};

		const outputFileName = `${uuidv4()}.mp3`;
		const outputFilePath = path.join(
			__dirname,
			"..",
			"public",
			"audio",
			outputFileName
		);

		const [response] = await client.synthesizeSpeech(request);

		await writeFileAsync(outputFilePath, response.audioContent);

		return `/audio/${outputFileName}`;
	} catch (error) {}
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
