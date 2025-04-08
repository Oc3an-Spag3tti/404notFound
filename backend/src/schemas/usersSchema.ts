import { Schema } from "mongoose";

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: [String],
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  stripeUser: JSON,
});
export default usersSchema;
