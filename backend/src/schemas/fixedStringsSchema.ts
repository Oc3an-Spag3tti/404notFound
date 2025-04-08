import mongoose from "mongoose";

const fixedStringsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  fixedString: {
    type: String,
    required: true,
  },
});
export default fixedStringsSchema;
