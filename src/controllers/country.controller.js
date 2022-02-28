require("dotenv").config();
import CountryService from "../services/country.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const countryService = CountryService.getInstance();

async function createCountry(req, res) {
  logger.info("[createCountry@controller] INIT");
  try {
    const countryData = req.body;
    const country = await countryService.createCountry(countryData);
    ResponseUtil.success(res, country);
  } catch (error) {
    logger.error("[createCountry@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[createCountry@controller] FINISHED");
}

async function getAllCountries(req, res) {
  logger.info("[getAllCountries@controller] INIT");
  try {
    const countries = await countryService.getAllCountries();
    ResponseUtil.success(res, countries);
  } catch (error) {
    logger.error("[getAllCountries@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[getAllCountries@controller] FINISHED");
}

async function getCountryByIsoCode(req, res) {
  logger.info("[getCountryByIsoCode@controller] INIT");
  try {
    const isoCode = req.params.isoCode;
    logger.info(`[getCountryByIsoCode@controller] isoCode: ${isoCode}`);
    const country = await countryService.getCountryByIsoCodeService(isoCode);
    ResponseUtil.nullResponseHandler(res, country);
  } catch (error) {
    logger.error("[getCountryByIsoCode@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[getCountryByIsoCode@controller] FINISHED");
}

async function updateCountry(req, res) {
  logger.info("[updateCountry@controller] INIT");
  try {
    const isoCode = req.params.isoCode;
    const updateData = req.body;
    logger.info(`[updateCountry@controller] isoCode: ${isoCode}`);
    const country = await countryService.updateCountry(isoCode, updateData);
    ResponseUtil.nullResponseHandler(res, country);
  } catch (error) {
    logger.error("[updateCountry@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[updateCountry@controller] FINISHED");
}

async function deleteCountry(req, res) {
  logger.info("[deleteCountry@controller] INIT");
  try {
    const isoCode = req.params.isoCode;
    logger.info(`[deleteCountry@controller] isoCode: ${isoCode}`);
    const country = await countryService.deleteCountry(isoCode);
    ResponseUtil.nullResponseHandler(res, country);
  } catch (error) {
    logger.error("[deleteCountry@controller] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[deleteCountry@controller] FINISHED");
}

export { createCountry, getAllCountries, getCountryByIsoCode, updateCountry, deleteCountry };