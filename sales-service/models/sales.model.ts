import mongoose, { Document, Model, Schema } from "mongoose";

import "dotenv/config";

export interface ISales extends Document {
  user: string;
  product: string;
  quantity: number;
  price: number;
}

//User Schema
const salesSchema: Schema<ISales> = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Enter user id"],
      index: true,
    },
    product: {
      type: String,
      required: [true, "Enter product name"],
    },
    quantity: {
      type: Number,
      required: [true, "Enter quantity"],
    },
    price: {
      type: Number,
      required: [true, "Enter product name"],
    },
  },

  { timestamps: true }
);

const salesModel: Model<ISales> = mongoose.model("sales", salesSchema);
export default salesModel;
