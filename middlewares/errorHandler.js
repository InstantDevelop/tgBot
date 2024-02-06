const errorHandler = (err, req, res, next) => {
  const { code = 500, message } = err;

  res.status(code).send({
    message: code === 500 ? 'Произошла ошибка на сервере' : message,
  });

  next();
};
module.exports = errorHandler;
