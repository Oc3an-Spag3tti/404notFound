import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import CategoriesRouteur from "./routes/categories";
import productsRouter from "./routes/products";
const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL!);

app.use(express.json());
app.use(cors());

app.use("/categories", CategoriesRouteur); // localhost:3000/categories
app.use("/products", productsRouter); // localhost:3000/products

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
