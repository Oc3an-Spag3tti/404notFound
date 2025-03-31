import { Router } from "express";
import { Request, Response } from "express";
import Categories from "../models/categoriesModel";

const CategoriesRouteur = Router();
CategoriesRouteur.get("/", async (req: Request, res: Response) => {
  res.send(await Categories.find());
});
CategoriesRouteur.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.send(await Categories.insertMany(req.body));
});
CategoriesRouteur.get("/:id", async (req: Request, res: Response) => {
  // route parameter
  res.send(await Categories.find({ _id: req.params.id }));
});
CategoriesRouteur.put("/:id", async (req: Request, res: Response) => {
  res.send(await Categories.updateOne({ _id: req.params.id }, req.body));
});
CategoriesRouteur.delete("/:id", async (req: Request, res: Response) => {
  res.send(await Categories.deleteOne({ _id: req.params.id }));
});
export default CategoriesRouteur;
