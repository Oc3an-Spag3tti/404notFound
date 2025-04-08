import mongoose from "mongoose";

const carrouselSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  linkUrl: { type: String, required: true },
  position: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

export default carrouselSchema;
