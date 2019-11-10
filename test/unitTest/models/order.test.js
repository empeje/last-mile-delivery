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

  describe("Paranoid table", () => {
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

  describe("Getter Setter", () => {
    let newOrder;
    let orderData;

    beforeEach(async () => {
      orderData = generateOrderData();
      newOrder = await Order.create(orderData);
    });

    afterEach(() => newOrder.destroy({ force: true }));

    describe("destinationCoordinate", async () => {
      it("should be able to get correct data", () => {
        const parsedDestination = newOrder.destinationCoordinate;
        const rawExpectedParsedDestination = orderData.destination.split(",");
        const expectedLat = rawExpectedParsedDestination[0];
        const expectedLong = rawExpectedParsedDestination[1];

        expect(parsedDestination).to.eql({
          lat: expectedLat,
          long: expectedLong
        });
      });

      it("should be able to set correct data", async () => {
        const expectedDestination = "123,456";
        const expectedLat = expectedDestination.split(",")[0];
        const expectedLong = expectedDestination.split(",")[1];

        newOrder.destinationCoordinate = {
          lat: expectedLat,
          long: expectedLong
        };

        await newOrder.save();
        await newOrder.reload(); // this to make sure data persist to disk

        expect(newOrder.destination).to.equal(expectedDestination);
      });
    });

    describe("originCoordinate", async () => {
      it("should be able to get correct data", () => {
        const parsedOrigin = newOrder.originCoordinate;
        const rawExpectedParsedOrigin = orderData.origin.split(",");
        const expectedLat = rawExpectedParsedOrigin[0];
        const expectedLong = rawExpectedParsedOrigin[1];

        expect(parsedOrigin).to.eql({
          lat: expectedLat,
          long: expectedLong
        });
      });

      it("should be able to set correct data", async () => {
        const expectedOrigin = "123,456";
        const expectedLat = expectedOrigin.split(",")[0];
        const expectedLong = expectedOrigin.split(",")[1];

        newOrder.originCoordinate = {
          lat: expectedLat,
          long: expectedLong
        };

        await newOrder.save();
        await newOrder.reload(); // this to make sure data persist to disk

        expect(newOrder.origin).to.equal(expectedOrigin);
      });
    });
  });
});
