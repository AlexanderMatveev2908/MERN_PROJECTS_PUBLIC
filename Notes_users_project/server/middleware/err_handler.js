const { log_events } = require("./logger.js");

const err_handler = (err, req, res, next) => {
  log_events(
    `${err.name} => ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n`,
    "err_log.log"
  );

  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({
    msg: err.message,
    isError: true,
  });

  next();
};

module.exports = err_handler;
