import Market from "../models/Market";
import errors from "../utils/codeInternalErrors";
import throwError from "../utils/throwError";
import log4js from "log4js";
import CountryService from "./country.service";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

export default class MarketService {

  static async createMarket(market) {
    logger.info("[createMarket@MarketService] INIT");
    const marketExists = await this.getMarketByIsoCode(market.marketCode);
    if(marketExists){
      throwError(errors.RESOURCE_ALREADY_EXISTS, errors.RESOURCE_ALREADY_EXISTS_MESSAGE);
    }
    market.countryIsoCodes = await CountryService.validateCountryIsoCodes(market.countryIsoCodes);
    const createdMarket = await Market.create(market);
    logger.info("[createMarket@MarketService] FINISH");
    return {
      _id: createdMarket._id,
      marketCode: createdMarket.marketCode,
      name: createdMarket.name,
      countryIsoCodes: createdMarket.countryIsoCodes,
    }
  }

  static async getAllMarkets() {
    return Market.aggregate([
      {"$project": {
        "_id": 1,
        "marketCode": 1,
        "name": 1,
        "countryIsoCodes": 1
      }},
      { "$sort": { marketCode: 1 } },
    ]);
  }

  static async getMarketByIsoCode(marketCode) {
    return Market.findOne({marketCode});
  }

  static async getMarketByIsoCodeService(marketCode) {
    return Market.findOne({marketCode}).select({
      _id: 1,
      marketCode: 1,
      name: 1,
      countryIsoCodes: 1,
    });
  }

  static async updateMarket(marketCode, updateData) {
    updateData.countryIsoCodes = await this.validateCountryIsoCodes(updateData.countryIsoCodes);
    return Market.findOneAndUpdate({marketCode}, updateData, {new: true}).select({
      _id: 1,
      marketCode: 1,
      name: 1,
      countryIsoCodes: 1,
    });
  }

  static async deleteMarket(marketCode) {
    return Market.findOneAndDelete({marketCode}).select({
      _id: 1,
      marketCode: 1,
      name: 1,
      countryIsoCodes: 1,
    });
  }

}