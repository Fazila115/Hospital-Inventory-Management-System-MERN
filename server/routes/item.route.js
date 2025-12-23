import express from "express";
import protect from "../middleware/authMiddleware.js";
import {createItem, getItems, getItemById, updateItem, deleteItem, lowStockItems, outOfStockItems, restockItem, getSuppliers, getExpiredItems, getExpiringSoon} from "../controllers/items.controller.js";

const router = express.Router();

router.route("/").post(protect, createItem).get(protect, getItems);

router.get("/suppliers", getSuppliers);

router.route("/:id").get(protect, getItemById).put(protect, updateItem).delete(protect, deleteItem);

router.get("/alerts/expired", protect, getExpiredItems);
router.get("/alerts/expiring-soon", protect, getExpiringSoon);
router.get("/alerts/low", protect, lowStockItems);
router.get("/alerts/out", protect, outOfStockItems);
router.put("/alerts/restock/:id", protect, restockItem);

export default router;