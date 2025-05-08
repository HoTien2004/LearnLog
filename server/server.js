import express from "express";
import { connect } from "./config/db.js";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

connect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
