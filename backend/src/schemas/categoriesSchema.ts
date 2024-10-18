import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  name: String,
});
export default categoriesSchema;
