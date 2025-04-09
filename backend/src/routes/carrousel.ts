import { Router } from "express";
import Carrousel from "../models/carrouselModel";

const carrouselRouteur = Router();
carrouselRouteur.get("/", async (req, res) => {
  const carrousels = await Carrousel.find();
  res.send(carrousels);
});
carrouselRouteur.get("/list", async (req, res) => {
  res.send(Carrousel.find({ isActive: true }).sort({ position: "asc" }));
});

carrouselRouteur.post("/", async (req, res) => {
  res.send(await Carrousel.insertMany(req.body));
});
carrouselRouteur.put("/:id", async (req, res) => {
  res.send(await Carrousel.updateOne({ _id: req.params.id }, req.body));
});
carrouselRouteur.delete("/:id", async (req, res) => {
  res.send(await Carrousel.deleteOne({ _id: req.params.id }));
});
export default carrouselRouteur;
