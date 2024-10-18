import mongoose from "mongoose";
import categoriesSchema from "../schemas/categoriesSchema";

const Categories = mongoose.model("Categories", categoriesSchema);
export default Categories;
