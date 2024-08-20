import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/mongodb";
import "./config/passport";
import { authRouter } from "./routes/authRouter";
import { docRouter } from "./routes/docRouter";
import { userRouter } from "./routes/userRouter";

const dotenv = config();
const app = express();
const ORIGIN = process.env.ORIGIN || "";

if (process.env.NODE_ENV !== "test") {
  connectDB();
}
// Middleware to parse JSON bodies
app.use(express.json());

//Enable cors
const corsOption = {
  origin: [ORIGIN],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};
app.use(cors(corsOption));

//api router
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/doc", docRouter);

app.listen(8080, () => {
  console.log("服務已經啟動");
});
