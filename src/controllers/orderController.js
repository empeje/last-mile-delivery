import {
  ENUM_ORDER_STATUS_SUCCESS,
  ENUM_ORDER_STATUS_UNASSIGNED
} from "../constants";
import models from "../models";
import { paginate } from "../utils";

const { Order } = models;

export const createOrder = async (req, res, next) =>
  models.sequelize
    .transaction(async transaction => {
      const { origin, destination } = req.body;
      const order = await Order.create(
        {
          origin: `${origin[0]},${origin[1]}`,
          destination: `${destination[0]},${destination[1]}`,
          status: ENUM_ORDER_STATUS_UNASSIGNED
        },
        { transaction }
      );
      order.distance = (await order.getDistance()).value;
      await order.save({ transaction });
      res
        .status(200)
        .send({ id: order.id, status: order.status, distance: order.distance });
    })
    .catch(next);

export const takeOrder = (req, res, next) =>
  models.sequelize
    .transaction(async transaction => {
      const { id } = req.params;
      const { status } = req.body;
      const order = await Order.findByPk(id, { transaction });
      if (!order) {
        return res.status(400).send({ error: "Order not found" });
      }

      if (order && order.status !== status) {
        await order.update({ status }, { transaction });
      }
      return res.status(200).send({ status: ENUM_ORDER_STATUS_SUCCESS });
    })
    .catch(next);

export const listOrders = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const orders = await Order.findAll({
      // reference: https://stackoverflow.com/a/8040702/5515861
      attributes: ["id", "distance", "status"],
      raw: true,
      ...paginate({ page: Number(page) - 1, pageSize: Number(limit) })
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
