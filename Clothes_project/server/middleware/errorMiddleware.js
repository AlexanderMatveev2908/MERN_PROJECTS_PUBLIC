export const errorMiddleware = (err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: err.message, success: false, stack: err.stack });
};
