import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";

import CategoriesRouteur from "./routes/categories";
const app = express();
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL!);
app.use("/categories", CategoriesRouteur);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
