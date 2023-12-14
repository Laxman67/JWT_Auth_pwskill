const express = require("express");
const authRouter = require("./router/authRoute");
const databaseConnect = require("./config/databaseConfig");
const app = express();
const cookiParser = require("cookie-parser");

databaseConnect();

app.use(express.json());
app.use(cookiParser);

app.use("/api/auth/", authRouter);

app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTAuth Server" });
});

module.exports = app;
