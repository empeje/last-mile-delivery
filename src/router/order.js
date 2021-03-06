import express from "express";
import {
  createOrder,
  listOrders,
  takeOrder
} from "../controllers/orderController";
import { validator } from "../utils";
import {
  createOrderBodyValidation,
  listOrderQueryValidation,
  takeOrderBodyValidation,
  takeOrderParamsValidation
} from "../validations/orderValidation";

const router = express.Router();

router.post("/", validator.body(createOrderBodyValidation), createOrder);
router.patch(
  "/:id",
  validator.params(takeOrderParamsValidation),
  validator.body(takeOrderBodyValidation),
  takeOrder
);
router.get("/", validator.query(listOrderQueryValidation), listOrders);

export default router;
