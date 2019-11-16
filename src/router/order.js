import express from "express";
import {
  createOrder,
  listOrders,
  takeOrder
} from "../controllers/orderController";

const router = express.Router();

router.post("/", createOrder);
router.patch("/", takeOrder);
router.get("/", listOrders);

export default router;
