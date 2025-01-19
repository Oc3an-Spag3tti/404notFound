import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

export default productsSchema;
