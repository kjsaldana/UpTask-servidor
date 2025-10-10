import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}

export async function autenticate(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('No autorizado.')
        return res.status(401).json({ error: error.message })
    }
    const token = bearer.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
        const user = await User.findById(decoded.id).select('_id name email')
        if (user) {
            req.user = user
        }else {
            res.status(500).json({ error: 'Token no valido' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Token no valido' })
    }
    next()
}