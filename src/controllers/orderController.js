import { ENUM_ORDER_STATUS_UNASSIGNED } from "../constants";
import models from "../models";

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

export const takeOrder = () => {};

export const listOrders = () => {};
