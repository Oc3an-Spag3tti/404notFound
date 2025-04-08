import mongoose from "mongoose";
import carrouselSchema from "../schemas/carrouselSchema";

const Carrousel = mongoose.model("Carrousel", carrouselSchema);
export default Carrousel;
