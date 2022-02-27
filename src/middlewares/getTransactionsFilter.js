require("dotenv").config();
import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const getTransactionsFilter = (req, res, next) => {
  logger.info("[getTransactionsFilter] INIT");

  const data = req.query;

  //pattern dd/mm/yyyy
  const pattern = /^(0?[1-9]|[12]\d|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  const schema = Joi.object({
    dateFrom: Joi.string().regex(pattern).optional(),
    dateTo: Joi.string().regex(pattern).optional(),
    marketCode: Joi.string().optional(),
    countryIsoCode: Joi.string().optional(),
  });

  const { error } = schema.validate(data);

  logger.info("[getTransactionsFilter] FINISH");
  error
    ? ResponseUtil.validationFailed(
        res,
        errors.VALIDATION_FAILED,
        error.details[0].message
      )
    : next();
};

export default getTransactionsFilter;