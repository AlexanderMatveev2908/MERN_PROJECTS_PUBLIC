require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT;
const { logger, log_events } = require("./middleware/logger");
const err_handler = require("./middleware/err_handler");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const cors_options = require("./config/cors_options");
const connect_DB = require("./config/db_connection");
const mongoose = require("mongoose");

connect_DB();

app.use(logger);

app.use(cors(cors_options));

app.use(express.json());

app.use(cookie_parser());

app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", require("./routes/root"));

app.use("/auth", require("./routes/auth_routes"));

app.use("/users", require("./routes/users_routes"));

app.use("/notes", require("./routes/notes_routes"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html"))
    res.sendFile(path.join(__dirname, "./views/404.html"));
  else if (req.accepts("json")) res.json({ error: "Not found" });
  else res.send("Not found");
});

app.use(err_handler);

mongoose.connection.once("open", () => {
  console.log(`=> connected to db`);
  app.listen(port, () => console.log(`=> server listening on port ${port}...`));
});

mongoose.connection.on("error", (err) => {
  log_events(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}\n`,
    "err_mongo.log"
  );
});
