import { Router } from "express";
import { Request, Response } from "express";
import Products from "../models/productsModels";

const productsRouter = Router();

productsRouter.get("/", async (req: Request, res: Response) => {
  const products = await Products.find();
  res.json(products);
});

export default productsRouter;
