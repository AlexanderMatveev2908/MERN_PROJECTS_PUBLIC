const allowed_origins = require("./allowed_origins");

const cors_options = {
  origin: (origin, cb) => {
    if (allowed_origins.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors_options;
