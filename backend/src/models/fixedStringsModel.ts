import mongoose from "mongoose";
import fixedStringsSchema from "../schemas/fixedStringsSchema";

const FixedStrings = mongoose.model("FixedStrings", fixedStringsSchema);
export default FixedStrings;
