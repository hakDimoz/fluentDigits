import express from "express";
import * as numberController from "../controllers/number.controller";

const router = express.Router();

router.get("/random", numberController.getRandomNumberSpeech);

export default router;
