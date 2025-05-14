import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendEmail";

//using interface for req.user
declare module "express" {
  interface Request {
    user?: IUser;
  }
}

//Register user interface
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

//Register user
export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, role } = req.body;

      //Check if email already exists
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
        role,
      };

      const data = {
        user: { name: user.name, password: user.password, role: user.role },
      };
      await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      //send email to user
      try {
        await sendMail({
          email: user.email,
          subject: "Account Creation",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `User account created successfully`,
        });
      } catch (error: any) {
        console.log(error);
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
