import { Request, Response, NextFunction } from "express";
import userModel from "../models/sales.model";
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
