import express from "express";

import { authorizeRoles, isAuthenticated } from "../utils/auth";
import { addSales } from "../controllers/sales.controller";

const salesRouter = express.Router();

salesRouter.post(
  "/add",
  isAuthenticated,
  authorizeRoles("admin", "sales"),
  addSales
);

export default salesRouter;
