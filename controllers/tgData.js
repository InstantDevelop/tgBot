const NotFound = require("../errors/notFound");
const IncorrectData = require("../errors/requestError");
const ServerError = require("../errors/serverError");
const TgDataList = require("../models/TgData");

const { OK_CODE, CODE_CREATED } = require("../states/states");

const getTgData = async (req, res, next) => {
  try {
    const tasks = await TgDataList.find({}).sort([["createdAt", -1]]);
    res.status(OK_CODE).send(tasks);
    if (res.status(OK_CODE).send(tasks)) {
      console.log(res);
    }
  } catch (e) {
    next(new ServerError("Произошла ошибка на сервере"));
  }
};

const delTgData = async (req, res, next) => {
  const taskIds = req.body;
  console.log(taskIds, req);
  try {
    const tasks = await TgDataList.deleteMany({ _id: { $in: taskIds } });
    if (tasks.deletedCount === 0) {
      next(new NotFound("No data found for the given IDs"));
      return;
    }
    res
      .status(OK_CODE)
      .send({ message: `${tasks.deletedCount} items deleted successfully` });
  } catch (e) {
    next(new ServerError("Произошла ошибка на сервере"), e);
  }
};

const addData = async (req, res, next) => {
  const { channelId, description } = req.body;

  try {
    const task = await new TgDataList({
      channelId,
      description,
    }).save();
    res.status(CODE_CREATED).send(task);
  } catch (e) {
    next(new ServerError("Произошла ошибка на сервере"), e);
  }
};

module.exports = {
  getTgData,
  delTgData,
  addData,
};
