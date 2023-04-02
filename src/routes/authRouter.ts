import express, { Express, Request, Response } from "express";

import { Models } from "../db/database";

import getAuthControllers from "../controllers/authController.js";

const router = express.Router();

export default function getPostsRouter(models: Models) {
    const controller = getAuthControllers(models);
    router.post("/login", controller.login);
    router.post("/register", controller.register);
    return router;
}
