import express from "express";
import dotenv from "dotenv";
const app = express();
import cors from "cors";
import Routes from "./routes/index.js";
import "./config/db.js";

import { connectDB } from "./config/db.js";
dotenv.config({ path: "config/config.env" });

console.log(process.env.PORT)

connectDB();
const hostname = process.env.HOST_NAME || "127.0.0.1";
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Hii I'm Running</h1>`);
});

app.use("/api", Routes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
