import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import User from "./models/user.model";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middleware/auth.middleware";
import taskRoutes from "./routes/task.routes";
import analyticsRoutes from "./routes/analytics.routes";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false })); // fixes swagger UI loading
app.use(morgan("dev"));

// swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/protected", protect, (req: any, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});

export default app;