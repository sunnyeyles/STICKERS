import fs from "fs";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
