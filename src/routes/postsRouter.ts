import express, { Express, Request, Response } from "express";
import { Models } from "../db/database";
import getPostControllers from "../controllers/postsController.js";

const router = express.Router();

export default function getPostsRouter(models: Models) {
    const controller = getPostControllers(models);

    router.post("/posts", controller.create);

    router.patch("/posts/:postId", controller.update);

    router.delete("/posts/:postId", controller.deleteById);

    router.get("/posts", controller.getAll);

    router.get("/posts/:postId", controller.getById);

    return router;
}
