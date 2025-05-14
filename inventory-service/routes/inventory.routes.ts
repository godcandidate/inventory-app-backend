import express from "express";
import { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getAllProducts,
  getProductById
} from "../controllers/inventory.controller";
import { authorizeRoles, isAuthenticated } from "../utils/auth";

const inventoryRouter = express.Router();

// Add product route - only admin and inventory roles can add products
inventoryRouter.post(
  "/add",
  isAuthenticated,
  authorizeRoles("admin", "inventory"),
  addProduct
);

// Update product route - only admin and inventory roles can update products
inventoryRouter.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "inventory"),
  updateProduct
);

// Delete product route - only admin can delete products
inventoryRouter.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProduct
);

// Get all products route - accessible to all authenticated users
inventoryRouter.get(
  "/all",
  isAuthenticated,
  getAllProducts
);

// Get product by ID route - accessible to all authenticated users
inventoryRouter.get(
  "/:id",
  isAuthenticated,
  getProductById
);

export default inventoryRouter;
