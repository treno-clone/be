import z from "zod";
import handleError from "../utils/handleError.js";

const checkBodyReq = (schema) => async (req, res, next) => {
  try {
    const data = await schema.parseAsync(req.body);
    console.log("Validated data:", data);
    req.validated = data; 
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((item) => ({
        path: item.path.join("."),
        message: item.message,
      }));
      return handleError(res, 400, "Bad request", errors);
    }
    return handleError(res, 500, "Internal server error", error);
  }
};

export default checkBodyReq;
