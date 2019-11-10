import * as chai from "chai";
import { afterEach, beforeEach, describe, it } from "mocha";
import models from "../../../src/models";

const { expect } = chai;

describe("Database connection", () => {
  const { sequelize } = models;

  beforeEach(() => {});
  afterEach(() => {});

  it("should able to connect to database", async () => {
    const [sequelizeCheckResult] = await sequelize.query("SELECT 1", {
      raw: true
    });
    expect(sequelizeCheckResult).to.eql([{ "1": 1 }]);
  });
});
