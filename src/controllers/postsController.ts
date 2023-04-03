import express, { Express, Request, Response } from "express";
import { Models } from "../db/database";
import { post } from "../db/models/Post";
import errorHadler from "../utils/errorHadler.js";

export default function getPostControllers(models: Models) {
    function create(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        models.post
            .create({ body: req.body.body, head: req.body.head } as post)
            .then(() => {
                res.send("ok");
            })
            .catch((e) => {
                errorHadler(e, res);
            });
    }

    const update = function (req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);
        let id = req.params["postId"] as string;
        models.post
            .update({
                id: id,
                body: req.body.body,
                head: req.body.head,
            } as post)
            .then(() => {
                res.send("ok");
            })
            .catch((e) => {
                errorHadler(e, res);
            });
    };

    const deleteById = function (req: Request, res: Response) {
        models.post
            .deleteById(req.params["postId"] as string)
            .then(() => {
                res.send("ok");
            })
            .catch((e) => {
                errorHadler(e, res);
            });
    };

    const getById = function (req: Request, res: Response) {
        models.post
            .getById(req.params["postId"] as string)
            .then((post) => {
                res.json(post);
            })
            .catch((e) => {
                errorHadler(e, res);
            });
    };

    const getAll = function (req: Request, res: Response) {
        models.post
            .getAll()
            .then((posts) => {
                res.json(posts);
            })
            .catch((e) => {
                errorHadler(e, res);
            });
    };
    return { create, update, deleteById, getById, getAll };
}
