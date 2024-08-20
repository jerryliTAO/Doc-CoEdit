import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/mongodb";
import "./config/passport";
import { authRouter } from "./routes/authRouter";
import { createDoc } from "./Services/DocService";

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

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }
  const objId = new mongoose.Types.ObjectId(id);

  const doc = await createDoc(objId);
  console.log(doc);
  res.send(doc);
});

app.use("/api/auth", authRouter);

app.listen(8080, () => {
  console.log("服務已經啟動");
});
