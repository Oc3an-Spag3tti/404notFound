import mongoose from "mongoose";
import productsSchema from "../schemas/productsSchema";

const Products = mongoose.model("Products", productsSchema);
export default Products;
