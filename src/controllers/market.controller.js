require("dotenv").config();
import MarketService from "../services/market.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const marketService = MarketService.getInstance();

async function createMarket(req, res) {
  logger.info("[createMarket@controller] INIT");
  try {
    const marketData = req.body;
    const market = await marketService.createMarket(marketData);
    ResponseUtil.success(res, market);
  } catch (error) {
    logger.error("[createMarket@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[createMarket@controller] FINISHED");
}

async function getAllMarkets(req, res) {
  logger.info("[getAllMarkets@controller] INIT");
  try {
    const markets = await marketService.getAllMarkets();
    ResponseUtil.success(res, markets);
  } catch (error) {
    logger.error("[getAllMarkets@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[getAllMarkets@controller] FINISHED");
}

async function getMarketByCode(req, res) {
  logger.info("[getMarketByCode@controller] INIT");
  try {
    const marketCode = req.params.marketCode;
    logger.info(`[getMarketByCode@controller] marketCode: ${marketCode}`);
    const market = await marketService.getMarketByCodeService(marketCode);
    ResponseUtil.nullResponseHandler(res, market);
  } catch (error) {
    logger.error("[getMarketByCode@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[getMarketByCode@controller] FINISHED");
}

async function updateMarket(req, res) {
  logger.info("[updateMarket@controller] INIT");
  try {
    const marketCode = req.params.marketCode;
    const updateData = req.body;
    logger.info(`[updateMarket@controller] marketCode: ${marketCode}`);
    const market = await marketService.updateMarket(marketCode, updateData);
    ResponseUtil.nullResponseHandler(res, market);
  } catch (error) {
    logger.error("[updateMarket@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[updateMarket@controller] FINISHED");
}

async function deleteMarket(req, res) {
  logger.info("[deleteMarket@controller] INIT");
  try {
    const marketCode = req.params.marketCode;
    logger.info(`[deleteMarket@controller] marketCode: ${marketCode}`);
    const market = await marketService.deleteMarket(marketCode);
    ResponseUtil.nullResponseHandler(res, market);
  } catch (error) {
    logger.error("[deleteMarket@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[deleteMarket@controller] FINISHED");
}

export { createMarket, getAllMarkets, getMarketByCode, updateMarket, deleteMarket };