require("dotenv").config();
import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";
import {TransactionCodeOptions} from "../models/Transaction";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const updateTransactionValidator = (req, res, next) => {
  logger.info("[updateTransactionValidator] INIT");

  const data = req.body;

  const pattern = /^(0?[1-9]|[12]\d|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  const schema = Joi.object({
    transactionDate: Joi.string().regex(pattern).optional(),
    productReference: Joi.string().optional(),
    countryIsoCode: Joi.string().optional(),
    transactionCode: Joi.number().valid(
      TransactionCodeOptions.RETURNED,
      TransactionCodeOptions.SALE
    ).optional().allow(0),
    unit: Joi.number().optional(),
  });

  const { error } = schema.validate(data);

  logger.info("[updateTransactionValidator] FINISH");
  error
    ? ResponseUtil.validationFailed(
        res,
        errors.VALIDATION_FAILED,
        error.details[0].message
      )
    : next();
};

export default updateTransactionValidator;