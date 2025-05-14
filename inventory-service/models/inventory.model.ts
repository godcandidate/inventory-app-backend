import mongoose, { Document, Model, Schema } from "mongoose";

import "dotenv/config";

export interface Inventory extends Document {
  name: string;
  unit_price: number;
  stock: number;
  status: string;
}

//Inventory Schema
const inventorySchema: Schema<Inventory> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name of product"],
    },
    unit_price: {
      type: Number,
      required: [true, "Enter product price"],
    },
    stock: {
      type: Number,
      required: [true, "Enter product stock"],
    },
    status: {
      type: String,
      enum: ["high", "low", "none"],
      default: "low", // Default status is low
    },
  },

  { timestamps: true }
);

// Pre-save middleware to set status based on stock level
inventorySchema.pre("save", function(next) {
  // 'this' refers to the inventory document being saved
  if (this.stock === 0) {
    this.status = "none";
  } else if (this.stock > 20) {
    this.status = "high";
  } else {
    this.status = "low";
  }
  next();
});

const inventoryModel: Model<Inventory> = mongoose.model(
  "inventories",
  inventorySchema
);
export default inventoryModel;
