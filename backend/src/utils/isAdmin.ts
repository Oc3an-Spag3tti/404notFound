import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ message: "Invalid Token" });
    return;
  }
  verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      res.status(401).send({ message: "Invalid Token" });
      return;
    }
    if (!decoded.isAdmin) {
      res.status(403).send({ message: "Access Denied" });
      return;
    }
    next();
  });
};

export default isAdmin;
