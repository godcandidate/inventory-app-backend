import { Request, Response, NextFunction } from "express";
import inventoryModel, { Inventory } from "../models/inventory.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

//using interface for req.user
export interface iuser {
  userId: string;
  role: string;
}

declare module "express" {
  interface Request {
    user?: iuser;
  }
}

//Inventory interface
interface IInventoryBody {
  name: string;
  unit_price: number;
  stock: number;
}

//Add product to inventory
export const addProduct = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, unit_price, stock } = req.body;

      // Check if product already exists
      const existingProduct = await inventoryModel.findOne({ name });
      if (existingProduct) {
        return next(new ErrorHandler("Product already exists", 400));
      }

      // Create new product
      const product: IInventoryBody = {
        name,
        unit_price,
        stock,
      };

      // Save product to database - status will be set automatically by the pre-save middleware
      await inventoryModel.create(product);

      res.status(201).json({
        message: `Product added successfully`,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Update product
export const updateProduct = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;
      const { name, unit_price, stock } = req.body;

      // Find product
      const product = await inventoryModel.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // Update fields if provided
      const updateFields: { [key: string]: any } = {};
      if (name) updateFields.name = name;
      if (unit_price !== undefined) updateFields.unit_price = unit_price;
      if (stock !== undefined) updateFields.stock = stock;

      // Update product - status will be updated automatically by the pre-save middleware
      const updatedProduct = await inventoryModel.findByIdAndUpdate(
        productId,
        updateFields,
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Delete product
export const deleteProduct = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;

      // Find product
      const product = await inventoryModel.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // Delete product
      await inventoryModel.findByIdAndDelete(productId);

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Get all products
export const getAllProducts = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await inventoryModel.find();

      res.status(200).json({
        products,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Get product by ID
export const getProductById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;

      const product = await inventoryModel.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        product,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
