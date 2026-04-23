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

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/create", async (req, res) => {
  try {
    const user = await User.create({
      name: "Silki",
      email: "silki@test.com",
      password: "123456"
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/protected", protect, (req: any, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});


export default app;

// app.listen(3000,()=>{
//     console.log("app is running at port 3000");
// })