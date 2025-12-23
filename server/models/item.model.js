import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    brand: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    supplier: { type: String, required: true },
    contact: { type: String, required: true },
    stock: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);