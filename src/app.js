"use strict";
const express = require("express");
const cors = require("cors");
const { router: todoRouter } = require("./routes/todo.route");

const app = express();

app.use(cors());

app.use("/todos", express.json(), todoRouter);

app.listen(3005, () => {});
