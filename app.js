import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Mongo DB connected..");
    app.listen(process.env.PORT, () => {
      console.log("Server is running. Use our API on port:" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
