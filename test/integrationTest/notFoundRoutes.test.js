import * as chai from "chai";
import { describe, it } from "mocha";
import request from "supertest";
import app from "../../src/app";

const { expect } = chai;

describe("Not Found Routes", () => {
  it("should return 404", async () => {
    await request(app)
      .get("/not-listed-routes")
      .expect(404);
  });

  it("should return in json format", async () => {
    const res = await request(app).get("/not-listed-routes");
    expect(res.body).to.deep.equal({ error: "Not found." });
  });
});
