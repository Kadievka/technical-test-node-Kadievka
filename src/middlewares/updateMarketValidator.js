require("dotenv").config();
import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const updateMarketValidator = (req, res, next) => {
  logger.info("[updateMarketValidator] INIT");

  const data = req.body;

  const schema = Joi.object({
    marketCode: Joi.string().optional(),
    name: Joi.string().optional(),
    countryIsoCodes: Joi.array().items(Joi.string()).optional(),
  });

  const { error } = schema.validate(data);

  logger.info("[updateMarketValidator] FINISH");
  error
    ? ResponseUtil.validationFailed(
        res,
        errors.VALIDATION_FAILED,
        error.details[0].message
      )
    : next();
};

export default updateMarketValidator;