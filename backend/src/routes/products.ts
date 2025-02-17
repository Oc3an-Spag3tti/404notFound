import { Router } from "express";
import { Request, Response } from "express";
import Products from "../models/productsModel";

const ProductsRouteur = Router();
ProductsRouteur.get("/", async (req: Request, res: Response) => {
  res.send(await Products.find());
});
ProductsRouteur.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.send(await Products.insertMany(req.body));
});
ProductsRouteur.get("/:id", async (req: Request, res: Response) => {
  res.send(await Products.find({ _id: req.params.id }));
});
ProductsRouteur.patch("/:id", async (req: Request, res: Response) => {
  res.send(await Products.updateOne({ _id: req.params.id }, req.body));
});
ProductsRouteur.delete("/:id", async (req: Request, res: Response) => {
  res.send(await Products.deleteOne({ _id: req.params.id }));
});
export default ProductsRouteur;
