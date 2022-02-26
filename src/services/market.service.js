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
    market.countryIsoCodes = await this.validateCountryIsoCodes(market.countryIsoCodes);
    const createdMarket = await Market.create(market);
    logger.info("[createMarket@MarketService] FINISH");
    return {
      id: createdMarket.id,
      marketCode: createdMarket.marketCode,
      name: createdMarket.name,
      countryIsoCodes: createdMarket.countryIsoCodes,
    }
  }

  static async validateCountryIsoCodes(countryIsoCodes){
    logger.info(`[validateCountryIsoCodes@MarketService] INIT countryIsoCodes: ${countryIsoCodes}`);
    let validCountryIsoCodes = [];
    if(countryIsoCodes.length){
      for (const countryIsoCode of countryIsoCodes) {
        const countryExists = await CountryService.getCountryByIsoCode(countryIsoCode);
        if(countryExists){
          validCountryIsoCodes.push(countryIsoCode);
        }
      }
      validCountryIsoCodes = validCountryIsoCodes.filter((item, index) => {
        return validCountryIsoCodes.indexOf(item) === index;
      });
    }
    logger.info(`[validateCountryIsoCodes@MarketService] FINISH validCountryIsoCodes: ${countryIsoCodes}`);
    return validCountryIsoCodes;
  }

  static async getAllMarkets() {
    return Market.aggregate([
      {"$project": {
        "id": 1,
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
      id: 1,
      marketCode: 1,
      name: 1,
      countryIsoCodes: 1,
    });
  }

  static async updateMarket(marketCode, updateData) {
    updateData.countryIsoCodes = await this.validateCountryIsoCodes(updateData.countryIsoCodes);
    return Market.findOneAndUpdate({marketCode}, updateData, {new: true}).select({
      id: 1,
      marketCode: 1,
      name: 1,
      countryIsoCodes: 1,
    });
  }

  static async deleteMarket(marketCode) {
    return Market.findOneAndDelete({marketCode}).select({
      id: 1,
      marketCode: 1,
      name: 1,
      countryIsoCodes: 1,
    });
  }

}