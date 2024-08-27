import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/mongodb";
import "./config/passport";
import { JwtPassport } from "./config/passport";
import { authRouter } from "./routes/authRouter";
import { docRouter } from "./routes/docRouter";
import { userRouter } from "./routes/userRouter";
import { socketServer } from "./server";

const dotenv = config();
const app = express();
const ORIGIN = process.env.ORIGIN || "";

if (process.env.NODE_ENV !== "test") {
  connectDB();
}
// Middleware to parse JSON bodies. Increase the limit to 10MB (adjust as needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

//Enable cors
const corsOption = {
  origin: [ORIGIN],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};
app.use(cors(corsOption));

//api router
app.use("/api/auth", authRouter);
app.use("/api/user", JwtPassport, userRouter);
app.use("/api/doc", JwtPassport, docRouter);

// visit not exist url to show 404
app.use((req, res) => {
  res.status(404).send("404 Can not find the page");
});

app.listen(8080, () => {
  console.log("服務已經啟動");
});

socketServer();
