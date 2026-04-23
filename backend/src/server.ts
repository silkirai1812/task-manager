import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

 console.log(process.env.GROQ_API_KEY);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});