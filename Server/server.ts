import express from "express";
import loginRoute from "./src/routes/loginRoute.js";
import dashboardRoute from "./src/routes/dashboardRoutes.js";
import { connectToDatabase } from "./src/config/dbConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
console.log("FRONTNED_URL:", process.env.FRONTEND_URL);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api", loginRoute);
app.use("/api", dashboardRoute);

app.listen(process.env.PORT || 5000, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
