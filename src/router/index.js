import express from "express";
import { notFoundMiddleware } from "../middleware";
import order from "./order";

const router = express.Router();

router.use("/order", order);
router.use(notFoundMiddleware);

export default router;
