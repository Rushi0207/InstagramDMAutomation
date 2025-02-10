const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");

beforeAll(async () => {
  await connectDB();
});

describe("API Endpoints", () => {
  it("should return analytics for a user", async () => {
    const res = await request(app).get("/api/analytics").set("Authorization", "Bearer testToken");
    expect(res.statusCode).toBe(200);
  });

  it("should fetch comments and send auto-replies", async () => {
    const res = await request(app).get("/api/comments/media123").set("Authorization", "Bearer testToken");
    expect(res.statusCode).toBe(200);
  });
});
