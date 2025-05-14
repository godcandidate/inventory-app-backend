import express from "express";

import { authorizeRoles, isAuthenticated } from "../utils/auth";
import { addSales, getAllSales } from "../controllers/sales.controller";

const salesRouter = express.Router();

salesRouter.post(
  "/add",
  isAuthenticated,
  authorizeRoles("admin", "sales"),
  addSales
);

salesRouter.get(
  "/all",
  isAuthenticated,
  authorizeRoles("admin", "sales"),
  getAllSales
);

export default salesRouter;
