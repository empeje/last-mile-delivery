import * as chai from "chai";
import chaiUuid from "chai-uuid";
import { afterEach, beforeEach, describe, it } from "mocha";
import sinon from "sinon";
import request from "supertest";
import app from "../../src/app";
import { ENUM_ORDER_STATUS_UNASSIGNED } from "../../src/constants";
import models from "../../src/models";
import { googleMapsClient } from "../../src/services";
import { destination, distanceMatrix, origin } from "../fixtures";

const { Order } = models;

const { expect } = chai;
chai.use(chaiUuid);

describe("Orders API", () => {
  let googleMapsStub;

  beforeEach(() => {
    googleMapsStub = sinon.stub(googleMapsClient, "distanceMatrix");
    googleMapsStub.returns({
      asPromise: () => distanceMatrix
    });
  });

  afterEach(() => {
    googleMapsStub.restore();
  });

  describe("Create an order", () => {
    afterEach(async () => {
      const order = await Order.findOne({
        where: {
          origin,
          destination
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
  });

  describe("Take an order", () => {});

  describe("List orders", () => {});
});
