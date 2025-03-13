const { format } = require("date-fns");
const { v4 } = require("uuid");
const fs = require("fs");
const fs_promises = require("fs").promises;
const path = require("path");

const log_events = async (message, log_file_name) => {
  const date_time = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const log_item = `${date_time}\t${v4()}\t${message}`;

  try {
    if (!fs.existsSync(path.join(__dirname, "../logs")))
      await fs_promises.mkdir(path.join(__dirname, "../logs"));

    await fs_promises.appendFile(
      path.join(__dirname, "../logs", log_file_name),
      log_item
    );
  } catch (err) {
    console.log("=> ", err);
  }
};

const logger = (req, res, next) => {
  log_events(
    `${req.method}\t${req.url}\t${req.headers.origin}\n`,
    "req_log.log"
  );

  console.log(`${req.method}\t${req.url}\t${req.headers.origin}`);

  next();
};

module.exports = { logger, log_events };
