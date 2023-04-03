import {
    Strategy,
    ExtractJwt,
    StrategyOptions,
    VerifyCallback,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { Models } from "../db/database";

export default function (passport: PassportStatic, models: Models) {
    const options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWTKEY,
    };

    const callback: VerifyCallback = (payload, done) => {
        const userPromise = models.user.getById(payload.id);

        userPromise
            .then((user) => {
                done(null, user ? user : false);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    passport.use(new Strategy(options, callback));
}
