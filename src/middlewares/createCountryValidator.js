require("dotenv").config();
import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const createCountryValidator = (req, res, next) => {
  logger.info("[createCountryValidator] INIT");

  const data = req.body;

  const pattern = /^[a-zA-Z]+$/

  const schema = Joi.object({
    isoCode: Joi.string().regex(pattern).required(),
    name: Joi.string().regex(pattern).required(),
  });

  const { error } = schema.validate(data);

  logger.info("[createCountryValidator] FINISH");
  error
    ? ResponseUtil.validationFailed(
        res,
        errors.VALIDATION_FAILED,
        error.details[0].message
      )
    : next();
};

export default createCountryValidator;