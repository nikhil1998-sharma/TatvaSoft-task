const express = require("express");
const app = express();
const mainRouter = require("./routes");
const cors = require("cors");
const { connectMongoDB } = require("./connection");
const PORT = 4000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api", mainRouter);

connectMongoDB("mongodb://127.0.0.1:27017/userDB").then(() =>
  console.log("MongoDB Connected")
);

app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));
