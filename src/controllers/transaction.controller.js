require("dotenv").config();
import TransactionService from "../services/transaction.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

async function getTransactionSummary(req, res) {
  logger.info("[getTransactionSummary@controller] INIT");
  try {
    const filterOptions = req.query;
    const transaction = await TransactionService.getTransactionSummary(filterOptions);
    ResponseUtil.success(res, transaction);
  } catch (error) {
    logger.error("[getTransactionSummary@controller] ERROR", error);
    if(error.code === errors.VALIDATION_FAILED) {
      ResponseUtil.validationFailed(res, error.code, error.message)
    }
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }
  logger.info("[getTransactionSummary@controller] FINISHED");
}

async function createTransaction(req, res) {
  logger.info("[createTransaction@controller] INIT");
  try {
    const transactionData = req.body;
    const transaction = await TransactionService.createTransaction(transactionData);
    ResponseUtil.success(res, transaction);
  } catch (error) {
    logger.error("[createTransaction@controller] ERROR", error);
    if(error.code === errors.VALIDATION_FAILED) {
      ResponseUtil.validationFailed(res, error.code, error.message)
    }
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[createTransaction@controller] FINISHED");
}

async function getAllTransactions(req, res) {
  logger.info("[getAllTransactions@controller] INIT");
  try {
    const transactions = await TransactionService.getAllTransactions();
    ResponseUtil.success(res, transactions);
  } catch (error) {
    logger.error("[getAllTransactions@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[getAllTransactions@controller] FINISHED");
}

async function getTransactionById(req, res) {
  logger.info("[getTransactionById@controller] INIT");
  try {
    const _id = req.params._id;
    logger.info(`[getTransactionById@controller] _id: ${_id}`);
    const transaction = await TransactionService.getTransactionByIdService(_id);
    ResponseUtil.nullResponseHandler(res, transaction);
  } catch (error) {
    logger.error("[getTransactionById@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[getTransactionById@controller] FINISHED");
}

async function updateTransaction(req, res) {
  logger.info("[updateTransaction@controller] INIT");
  try {
    const _id = req.params._id;
    const updateData = req.body;
    logger.info(`[updateTransaction@controller] _id: ${_id}`);
    const transaction = await TransactionService.updateTransaction(_id, updateData);
    ResponseUtil.nullResponseHandler(res, transaction);
  } catch (error) {
    logger.error("[updateTransaction@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[updateTransaction@controller] FINISHED");
}

async function deleteTransaction(req, res) {
  logger.info("[deleteTransaction@controller] INIT");
  try {
    const _id = req.params._id;
    logger.info(`[deleteTransaction@controller] _id: ${_id}`);
    const transaction = await TransactionService.deleteTransaction(_id);
    ResponseUtil.nullResponseHandler(res, transaction);
  } catch (error) {
    logger.error("[deleteTransaction@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[deleteTransaction@controller] FINISHED");
}

export {
  getTransactionSummary,
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
}
