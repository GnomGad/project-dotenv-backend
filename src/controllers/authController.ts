import { Request, Response } from "express";
import Promise from "bluebird";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Models } from "../db/database";

export default function getAuthControllers(models: Models) {
    const login = function (req: Request, res: Response) {
        const userPromise = models.user.getByEmail({ email: req.body.email });

        userPromise
            .then((user) => {
                if (!user) {
                    throw Error("404");
                }

                return user;
            })
            .then((user) => {
                console.log(process.env.JWTKEY);
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    throw Error("401");
                }
                const token = jwt.sign(
                    {
                        email: user.email,
                        id: user.id,
                    },
                    process.env.JWTKEY as string,
                    { expiresIn: 3600 }
                );
                res.status(200).json({
                    token: `Bearer ${token}`,
                });
            })
            .catch((e) => {
                if (e.message === "404") {
                    res.status(404).send("user is don't exists");
                    return;
                }
                if (e.message === "401") {
                    res.status(401).send("wrong password");
                    return;
                }
                console.error(e);
                res.status(403).send("failed");
            });
    };

    const register = function (req: Request, res: Response) {
        const userPromise = models.user.getByEmail({ email: req.body.email });

        userPromise
            .then((user) => {
                if (user) {
                    throw Error("409");
                }

                return user;
            })
            .then(() => {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                return models.user.create({
                    email: req.body.email,
                    password: hash,
                });
            })
            .then(() => {
                console.log(`user ${req.body.email} created`);
                res.status(201).send(`user ${req.body.email} created`);
            })
            .catch((e) => {
                if (e.message === "409") {
                    res.status(409).send("user is exists");
                    return;
                }
                console.error(e);
                res.status(403).send("failed");
            });
    };

    return { login, register };
}
