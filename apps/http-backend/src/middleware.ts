import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';

export function middleware(req:Request , res :Response , next : NextFunction){
    // check if a request contain valid jwt 
    const token = req.headers["authorization"] ?? ""
    // this will be a string type 
    const decoded = jwt.verify(token , JWT_SECRET);

    if(decoded){
        // @ts-ignore  : todo : fix this ??  add some global type 
        req.userId = decoded.userId;
        next();
    }
    else{
        res.status(403).json({
            message : "Unauthorized"
        })
    }

}