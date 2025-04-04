import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({origin: "https://fluentdigits.onrender.com"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

const PORT = process.env.PORT || 8080;

// Routes
import numberRouter from "./routes/number.route.js";

app.use("/api/number", numberRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});