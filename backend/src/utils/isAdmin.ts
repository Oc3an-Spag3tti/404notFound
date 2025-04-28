import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send({ message: "Token missing or malformed" });
    return;
  }

  const token = authHeader.split(" ")[1];

  verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      console.error("Token verification error:", err.message);
      res.status(401).send({ message: "Invalid Token" });
      return;
    }

    console.log("Decoded Token:", decoded);

    if (!decoded.isAdmin) {
      res.status(403).send({ message: "Access Denied" });
      return;
    }

    next();
  });
};

export default isAdmin;
