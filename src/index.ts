import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

import connectDB from "./db/database.js";
import registration from "./apiRegistrator.js";

const port = process.env.PORT;
const dbPath = process.env.DBPATH as string;

const { DB, db, models } = connectDB(dbPath);

const app: Express = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

registration(app, models);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
