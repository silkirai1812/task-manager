import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

let token: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  // register and login to get token
  await request(app)
    .post("/api/auth/register")
    .send({ name: "Task Tester", email: "tasktest@example.com", password: "password123" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "tasktest@example.com", password: "password123" });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Task APIs", () => {
  let taskId: string;

  describe("POST /api/tasks", () => {
    it("should create a task", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Task",
          description: "This is a test task description",
          status: "todo",
          priority: "medium",
          dueDate: "2026-12-01"
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("title", "Test Task");
      expect(res.body).toHaveProperty("summary");
      taskId = res.body._id;
    });

    it("should reject task without title", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          description: "No title task",
          dueDate: "2026-12-01"
        });

      expect(res.status).toBe(400);
    });

    it("should reject unauthenticated request", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .send({ title: "Test", description: "Test", dueDate: "2026-12-01" });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/tasks", () => {
    it("should get all tasks for user", async () => {
      const res = await request(app)
        .get("/api/tasks")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should reject unauthenticated request", async () => {
      const res = await request(app).get("/api/tasks");
      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should get a single task", async () => {
      const res = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", taskId);
    });

    it("should return 404 for non-existent task", async () => {
      const res = await request(app)
        .get("/api/tasks/000000000000000000000000")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update a task", async () => {
      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Updated Task", description: "Updated description", dueDate: "2026-12-01" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", "Updated Task");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task", async () => {
      const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Task deleted");
    });
  });
});