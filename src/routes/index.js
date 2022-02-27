require("dotenv").config();
import express from "express";

const app = express();

app.use("/user", require("./user.routes"));
app.use("/countries", require("./country.routes"));
app.use("/markets", require("./market.routes"));
app.use("/transactions", require("./transaction.routes"));

export default app;
