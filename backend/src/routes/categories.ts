import { Router } from "express";
import express, { Request, Response } from "express";
import Categories from "../models/categoriesModel";

const CategoriesRouteur = Router();
CategoriesRouteur.get("/", async (req: Request, res: Response) => {
  res.send(await Categories.find());
});
export default CategoriesRouteur;
