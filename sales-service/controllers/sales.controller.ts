import { Request, Response, NextFunction } from "express";
import userModel from "../models/sales.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import salesModel from "../models/sales.model";

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

//Sales interface
interface ISalesBody {
  user: string;
  product: string;
  quantity: string;
  price: string;
}

//Add Sales
export const addSales = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { product, quantity, price } = req.body;
      const user = req.user?.userId as string;

      const sale: ISalesBody = {
        user,
        product,
        quantity,
        price,
      };

      //Save sales to database
      await userModel.create(sale);

      res.status(201).json({
        message: `Sale Added successfully`,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all sales
export const getAllSales = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get all users with only name, email, and role fields
      const sales = await salesModel.find(
        {},
        "user product quantity price createdAt"
      );

      res.status(200).json({
        sales,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all sales
export const getAllUserSales = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;

      const sales = await salesModel.find(
        { user: userId },
        "user product quantity price createdAt"
      );

      res.status(200).json({
        sales,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get sales data for a specific user
export const getUserSalesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return next(new ErrorHandler("User ID is required", 400));
      }

      // Get today's date range
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

      // Find all sales for the specific user today
      const userSales = await salesModel.find({
        user: userId,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      });

      // Calculate total sales count
      const totalSalesCount = userSales.length;

      // Calculate total sales amount
      const totalSalesAmount = userSales.reduce((total, sale) => {
        return total + sale.price;
      }, 0);

      // Get sales by product
      interface SalesByProduct {
        [key: string]: {
          totalAmount: number;
          quantity: number;
        };
      }

      res.status(200).json({
        totalSalesCount,
        totalSalesAmount,
        averageSaleAmount:
          totalSalesCount > 0 ? totalSalesAmount / totalSalesCount : 0,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get all users who made sales today
export const getAllSalesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get today's date range
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

      // Find all sales for the specific user today
      const userSales = await salesModel.find({
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      });

      // Calculate total sales count
      const totalSalesCount = userSales.length;

      // Calculate total sales amount
      const totalSalesAmount = userSales.reduce((total, sale) => {
        return total + sale.price;
      }, 0);

      // Get sales by product
      interface SalesByProduct {
        [key: string]: {
          totalAmount: number;
          quantity: number;
        };
      }

      res.status(200).json({
        totalSalesCount,
        totalSalesAmount,
        averageSaleAmount:
          totalSalesCount > 0 ? totalSalesAmount / totalSalesCount : 0,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
