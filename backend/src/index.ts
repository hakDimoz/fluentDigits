import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

const PORT = process.env.PORT || 8080;

// Routes
import numberRouter from "./routes/number.route";

app.use("/api/number", numberRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});