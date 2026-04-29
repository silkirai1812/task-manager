import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth APIs", () => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123"
  };

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("email", testUser.email);
      expect(res.body).not.toHaveProperty("password");
    });

    it("should reject duplicate email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "User already exists");
    });

    it("should reject invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ name: "Test", email: "banana", password: "password123" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Validation failed");
    });

    it("should reject empty password", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ name: "Test", email: "test2@example.com", password: "" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Validation failed");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login and return token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should reject wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "wrongpassword" });

      expect(res.status).toBe(401);
    });

    it("should reject non-existent email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nobody@example.com", password: "password123" });

      expect(res.status).toBe(401);
    });
  });
});