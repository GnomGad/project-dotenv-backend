import express, { Express } from "express";
import { Models } from "./db/database.js";
import getPostRouter from "./routes/postsRouter.js";
import getAuthRouter from "./routes/authRouter.js";

export default function registration(app: Express, models: Models) {
    const router = express.Router();

    const postsRouter = getPostRouter(models);
    router.use("/api", postsRouter);

    const authRouter = getAuthRouter(models);
    router.use("/auth", authRouter);

    app.use("/api", router);
}
