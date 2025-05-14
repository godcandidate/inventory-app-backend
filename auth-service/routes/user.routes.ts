import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../utils/auth";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.put("/update", isAuthenticated, updateUser);

userRouter.delete("/delete", isAuthenticated, deleteUser);

export default userRouter;
