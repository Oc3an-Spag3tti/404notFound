import mongoose from "mongoose";

import categoriesSchema from "./categoriesSchema";

const productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  caracteristics: Object
});

export default productsSchema;
