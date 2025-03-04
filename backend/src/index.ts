import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
import numberRouter from "./routes/number.route";

app.use("/api/number", numberRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});