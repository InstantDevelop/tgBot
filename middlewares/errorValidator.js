const { celebrate, Joi } = require("celebrate");
const { ObjectId } = require("mongoose").Types;
const validUrl = require("validator/lib/isURL");

const validLink = (value, helpers) => {
  if (!value) {
    return value;
  }
  if (validUrl(value)) {
    return value;
  }
  return helpers.error("any.invalid");
};

const validTitle = (value, helpers) => {
  if (!/[а-яА-Яa-zA-Z0-9-._~:/?#@!$&'()*+,;=]+?$/.test(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};
const validState = (value, helpers) => {
  if (!value) {
    return value; // Allow empty string
  }
  const allowedStates = [
    "done",
    "in_process",
    "paused",
    "not_started",
    "stopped",
  ];

  if (!allowedStates.includes(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const validateTask = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(40).custom(validTitle),
    description: Joi.string().max(1000),
    lastChangeDate: Joi.date().iso(),
    state: Joi.custom(validState),
    taskLink: Joi.custom(validLink),
  }),
});

module.exports = {
  validateTask,
};
