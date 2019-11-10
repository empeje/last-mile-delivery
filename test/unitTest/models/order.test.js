import * as chai from "chai";
import chaiUuid from "chai-uuid";
import * as faker from "faker";
import { afterEach, beforeEach, describe, it } from "mocha";
import {
  ENUM_ORDER_STATUS_TAKEN,
  ENUM_ORDER_STATUS_UNASSIGNED
} from "../../../src/constants";
import models from "../../../src/models";

const { expect } = chai;
chai.use(chaiUuid);

const { random } = faker;
const { Order } = models;

describe("Order Model", () => {
  const generateOrderData = () => ({
    origin: `${random.number()},${random.number()}`,
    destination: `${random.number()},${random.number()}`,
    distance: random.number().toFixed(4),
    status: random.arrayElement([
      ENUM_ORDER_STATUS_UNASSIGNED,
      ENUM_ORDER_STATUS_TAKEN
    ])
  });

  describe("Schema definition", () => {
    describe("valid input", () => {
      let orderData;
      let newOrder;

      beforeEach(async () => {
        orderData = generateOrderData();
        newOrder = await Order.create(orderData);
      });

      afterEach(() => newOrder.destroy({ force: true }));

      it("should create if inputs are valid", () => {
        expect(newOrder.id).to.be.a.uuid("v4");
        Object.keys(orderData).map(key =>
          // Convert to strings before comparison because dates and integers are returned
          // as strings from Sequelize
          expect(newOrder[key].toString()).to.equal(orderData[key].toString())
        );
      });

      it("should be findable in database", async () => {
        const currentOrder = await Order.findOne({
          where: {
            distance: orderData.distance
          }
        });
        expect(currentOrder.distance).to.equal(orderData.distance);
      });
    });
  });

  describe("paranoid table", () => {
    let newOrder;
    let orderData;

    beforeEach(async () => {
      orderData = generateOrderData();
      newOrder = await Order.create(orderData);
      await newOrder.destroy();
    });

    afterEach(() => newOrder.destroy({ force: true }));

    it("should not show soft deleted record", async () => {
      const results = await Order.findAll({
        where: {
          destination: newOrder.destination
        }
      });
      expect(results).to.have.length(0);
    });

    it("should show soft deleted record if paranoid flag is false", async () => {
      const results = await Order.findAll({
        where: {
          destination: newOrder.destination
        },
        paranoid: false
      });
      expect(results).to.have.length(1);
      expect(results[0].destination).to.equal(orderData.destination);
    });
  });
});
