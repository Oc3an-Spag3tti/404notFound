import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import CategoriesRouteur from "./routes/categories";
import productsRouter from "./routes/products";
import Stripe from "stripe";
import fixedStringsRouter from "./routes/fixedStrings";
import usersRouter from "./routes/users";
import carrouselRouteur from "./routes/carrousel";
const app = express();

const port = process.env.PORT || 3000;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
mongoose.connect(process.env.MONGO_URL!);

app.use(express.json());
app.use(cors());

app.use("/categories", CategoriesRouteur);
app.use("/products", productsRouter);
app.use("/fixedStrings", fixedStringsRouter);
app.use("/users", usersRouter);
app.use("/carrousel", carrouselRouteur);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
