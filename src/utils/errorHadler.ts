import { Response } from "express";

export default function (err: Error, res: Response) {
    console.log(err);
    res.status(500).json({
        success: false,
        message: err.message ? err.message : err,
    });
}
