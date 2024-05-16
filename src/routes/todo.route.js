const express = require("express");
const cors = require("cors");
const todoController = require("../controllers/todo.controller");
const { isAction } = require("../middlewares/isAction");

const router = express.Router();

router.get("/", cors(), todoController.get);

router.get("/:id", todoController.getOne);

router.post("/", todoController.create);

router.put("/:id", todoController.update);

router.delete("/:id", todoController.remove);

router.patch("/", isAction("delete"), todoController.removeMany);
router.patch("/", isAction("update"), todoController.updateMany);

module.exports = { router };
