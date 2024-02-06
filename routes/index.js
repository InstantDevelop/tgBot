const express = require("express");

const NotFound = require("../errors/notFound");
const {
  getTgData,
  delTgData,
  addData,
} = require("../controllers/tgData");

const router = express.Router();
router.get("/", getTgData);
router.post("/data", addData);
router.delete("/data", delTgData);

router.all("*", (req, res, next) => {
  next(new NotFound("Страница не найдена"));
});

module.exports = router;
