import express from "express";

import { authorizeRoles, isAuthenticated } from "../utils/auth";
import {
  addSales,
  getAllSales,
  getUserSalesAnalytics,
  getAllSalesAnalytics,
  getAllUserSales,
} from "../controllers/sales.controller";

const salesRouter = express.Router();

salesRouter.post(
  "/add",
  isAuthenticated,
  authorizeRoles("admin", "sales"),
  addSales
);

salesRouter.get("/all", isAuthenticated, authorizeRoles("admin"), getAllSales);

salesRouter.get(
  "/user",
  isAuthenticated,
  authorizeRoles("admin", "sales"),
  getAllUserSales
);

// Analytics routes
salesRouter.get(
  "/user/analytics",
  isAuthenticated,
  authorizeRoles("admin", "sales"),
  getUserSalesAnalytics
);

salesRouter.get(
  "/analytics",
  isAuthenticated,
  authorizeRoles("admin", "sales"),
  getAllSalesAnalytics
);

export default salesRouter;
