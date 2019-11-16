import * as chai from "chai";
import chaiUuid from "chai-uuid";
import * as faker from "faker";
import { afterEach, beforeEach, describe, it } from "mocha";
import sinon from "sinon";
import request from "supertest";
import app from "../../src/app";
import {
  ENUM_ORDER_STATUS_SUCCESS,
  ENUM_ORDER_STATUS_TAKEN,
  ENUM_ORDER_STATUS_UNASSIGNED
} from "../../src/constants";
import models from "../../src/models";
import { googleMapsClient } from "../../src/services";
import { destination, distanceMatrix, origin } from "../fixtures";

const { Order } = models;
const { random } = faker;

const { expect } = chai;
chai.use(chaiUuid);

describe("Orders API", () => {
  describe("Create an order", () => {
    describe("Order created successfully", () => {
      let googleMapsStub;

      beforeEach(() => {
        googleMapsStub = sinon.stub(googleMapsClient, "distanceMatrix");
        googleMapsStub.returns({
          asPromise: () => distanceMatrix
        });
      });

      afterEach(async () => {
        googleMapsStub.restore();
        const order = await Order.findOne({
          where: {
            origin,
            destination,
            distance: distanceMatrix.json.rows[0].elements[0].distance.value
          }
        });
        order.destroy({ force: true });
      });

      it("should return correct API response", async () => {
        const res = await request(app)
          .post("/orders")
          .send({
            origin: [origin.split(",")[0], origin.split(",")[1]],
            destination: [destination.split(",")[0], destination.split(",")[1]]
          })
          .set("Accept", "application/json")
          .expect(200);

        expect(res.body.id).to.be.a.uuid("v4");
        expect(res.body).to.deep.include({
          distance: distanceMatrix.json.rows[0].elements[0].distance.value,
          status: ENUM_ORDER_STATUS_UNASSIGNED
        });
      });

      it("should create the order", async () => {
        await request(app)
          .post("/orders")
          .send({
            origin: [origin.split(",")[0], origin.split(",")[1]],
            destination: [destination.split(",")[0], destination.split(",")[1]]
          })
          .set("Accept", "application/json");

        const order = await Order.findOne({
          where: {
            origin,
            destination,
            distance: distanceMatrix.json.rows[0].elements[0].distance.value
          }
        });

        expect(order).to.not.be.null;
      });
    });

    describe("Order creation should be a transaction", () => {
      let googleMapsStub;

      beforeEach(() => {
        googleMapsStub = sinon
          .stub(googleMapsClient, "distanceMatrix")
          .throws();
      });

      afterEach(() => {
        googleMapsStub.restore();
      });

      it("should rollback order creation when google maps return error", async () => {
        await request(app)
          .post("/orders")
          .send({
            origin: [origin.split(",")[0], origin.split(",")[1]],
            destination: [destination.split(",")[0], destination.split(",")[1]]
          })
          .set("Accept", "application/json")
          .expect(500);

        const order = await Order.findOne({
          where: {
            origin,
            destination
          }
        });

        expect(order).to.be.null;
      });
    });

    describe("Order not created successfully", () => {
      it("should return validation error when origin missing", async () => {
        await request(app)
          .post("/orders")
          .send({
            origin: [origin.split(",")[0], origin.split(",")[1]]
          })
          .set("Accept", "application/json")
          .expect(400);
      });

      it("should return validation error when destination missing", async () => {
        await request(app)
          .post("/orders")
          .send({
            destination: [destination.split(",")[0], destination.split(",")[1]]
          })
          .set("Accept", "application/json")
          .expect(400);
      });

      it("should return validation error when unnecessary data coming", async () => {
        await request(app)
          .post("/orders")
          .send({
            anything: random.number()
          })
          .set("Accept", "application/json")
          .expect(400);
      });

      it("should return validation error when origin is not number", async () => {
        await request(app)
          .post("/orders")
          .send({
            origin: random.alphaNumeric(10),
            destination: [destination.split(",")[0], destination.split(",")[1]]
          })
          .set("Accept", "application/json")
          .expect(400);
      });

      it("should return validation error when destination is not number", async () => {
        await request(app)
          .post("/orders")
          .send({
            origin: [origin.split(",")[0], origin.split(",")[1]],
            destination: random.alphaNumeric(10)
          })
          .set("Accept", "application/json")
          .expect(400);
      });
    });
  });

  describe("Take an order", () => {
    describe("Status successfully updated", () => {
      let newOrder;

      beforeEach(async () => {
        newOrder = await Order.create({
          origin,
          destination,
          distance: distanceMatrix.json.rows[0].elements[0].distance.value
        });
      });
      afterEach(async () => {
        newOrder.destroy({ force: true });
      });

      it("should return correct result", async () => {
        const res = await request(app)
          .patch(`/orders/${newOrder.id}`)
          .send({
            status: ENUM_ORDER_STATUS_TAKEN
          })
          .set("Accept", "application/json")
          .expect(200);

        expect(res.body).to.deep.equal({
          status: ENUM_ORDER_STATUS_SUCCESS
        });
      });

      it("should update status", async () => {
        await request(app)
          .patch(`/orders/${newOrder.id}`)
          .send({
            status: ENUM_ORDER_STATUS_TAKEN
          })
          .set("Accept", "application/json");

        await newOrder.reload();
        expect(newOrder.status).to.equal(ENUM_ORDER_STATUS_TAKEN);
      });
    });

    describe("Status not updated successfully", () => {
      it("should return error when order id not found", async () => {
        const res = await request(app)
          .patch(`/orders/${random.uuid()}`)
          .send({
            status: ENUM_ORDER_STATUS_TAKEN
          })
          .set("Accept", "application/json")
          .expect(400);

        expect(res.body.error).to.equal("Order not found");
      });

      it("should return validation error when status is not valid", async () => {
        const res = await request(app)
          .patch(`/orders/${random.uuid()}`)
          .send({
            status: random.arrayElement([
              ENUM_ORDER_STATUS_SUCCESS,
              ENUM_ORDER_STATUS_UNASSIGNED
            ])
          })
          .set("Accept", "application/json")
          .expect(400);

        expect(res.body.error).to.not.equal("Order not found");
      });

      it("should return validation error when status field is not sent", async () => {
        const res = await request(app)
          .patch(`/orders/${random.uuid()}`)
          .send({})
          .set("Accept", "application/json")
          .expect(400);

        expect(res.body.error).to.not.equal("Order not found");
      });

      it("should return validation error when additional data included", async () => {
        const res = await request(app)
          .patch(`/orders/${random.uuid()}`)
          .send({
            status: ENUM_ORDER_STATUS_TAKEN,
            additional: "THIS IS NOT EXPECTED"
          })
          .set("Accept", "application/json")
          .expect(400);

        expect(res.body.error).to.not.equal("Order not found");
      });
    });
  });

  describe("List orders", () => {});
});
