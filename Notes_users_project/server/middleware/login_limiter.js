const rate_limit = require("express-rate-limit");
const { log_events } = require("./logger");

const login_limiter = rate_limit({
  windowMS: 60 * 1000,
  max: 5,
  message: { message: "=> too many attempts from this IP, try later" },
  handler: (req, res, next, options) => {
    log_events(
      `=> too many request: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n`,
      "err_log.log"
    );
    res.status(options.statusCode).json({ message: options.message });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = login_limiter;
