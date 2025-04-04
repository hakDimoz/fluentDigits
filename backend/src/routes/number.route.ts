import express from "express";
import * as numberController from "../controllers/number.controller.js";

const router = express.Router();

router.get("/random", numberController.getRandomNumberSpeech);
router.get("/voices", numberController.getVoicesList);

export default router;
