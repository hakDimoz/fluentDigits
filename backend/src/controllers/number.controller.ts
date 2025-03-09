import {
  getRandomNumberSpeechRequest,
  getRandomNumbersSpeechRequest,
} from "../types/number.model";
import { Request, Response } from "express";
import { convertTextToSpeech, listVoices } from "../utilities/google-api";
import { ConvertTextToSpeechRequest, ListVoicesRequest } from "../types/text-to-speech.model";

export const getRandomNumberSpeech = async (req: Request, res: Response) => {
  try {
    const data: getRandomNumberSpeechRequest = req.body;

    const randomNumber = Math.floor(
      Math.random() * (data.range.max - data.range.min + 1) + data.range.min
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
    res.status(200).json(result);
  } catch (error) {
    console.error(error, "Error generating voices list");
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
