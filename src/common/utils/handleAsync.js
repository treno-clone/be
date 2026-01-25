import handleError from "./handleError.js";

const handleAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    handleError(res, 500, "Server Error!", err);
    console.log(err);
  });
};

export default handleAsync;