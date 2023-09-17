import express from "express";
import dotenv from "dotenv";
const app = express();
import cors from "cors";
import Routes from "./routes/index.js";
import "./config/db.js";
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import AptitudeRoute from "./routes/aptiRoutes.js"

dotenv.config();

connectDB();
const hostname = process.env.HOST_NAME || "127.0.0.1";
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Hii I'm Running</h1>`);
});

app.use("/api", Routes);
app.use("/api", AptitudeRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
