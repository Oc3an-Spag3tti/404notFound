import mongoose from "mongoose";
import usersSchema from "../schemas/usersSchema";

const User = mongoose.model("User", usersSchema);
export default User;
