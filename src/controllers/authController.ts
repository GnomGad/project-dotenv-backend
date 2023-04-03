import { Request, Response } from "express";
import Promise from "bluebird";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Models } from "../db/database";
import errorHadler from "../utils/errorHadler.js";

export default function getAuthControllers(models: Models) {
    const login = function (req: Request, res: Response) {
        const userPromise = models.user.getByEmail({ email: req.body.email });

        userPromise
            .then((user) => {
                if (!user) {
                    throw Error("Пользователя не существует");
                }

                return user;
            })
            .then((user) => {
                console.log(process.env.JWTKEY);
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    throw Error("Не верный пароль");
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
                errorHadler(e, res);
            });
    };

    const register = function (req: Request, res: Response) {
        const userPromise = models.user.getByEmail({ email: req.body.email });

        userPromise
            .then((user) => {
                if (user) {
                    throw Error("Пользователь уже создан");
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
                errorHadler(e, res);
            });
    };

    return { login, register };
}
