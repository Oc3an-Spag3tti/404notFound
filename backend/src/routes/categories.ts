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
export default CategoriesRouteur;
