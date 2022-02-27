import Country from "../models/Country";
import errors from "../utils/codeInternalErrors";
import throwError from "../utils/throwError";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

export default class CountryService {

  static async createCountry(country) {
    logger.info("[createCountry@CountryService] INIT");
    const countryExists = await this.getCountryByIsoCode(country.isoCode);
    if(countryExists){
      throwError(errors.RESOURCE_ALREADY_EXISTS, errors.RESOURCE_ALREADY_EXISTS_MESSAGE);
    }
    const createdCountry = await Country.create(country);
    logger.info("[createCountry@CountryService] FINISH");
    return {
      _id: createdCountry._id,
      isoCode: createdCountry.isoCode,
      name: createdCountry.name,
    }
  }

  static async getAllCountries() {
    return Country.aggregate([
      {"$project": {
        "_id": 1,
        "isoCode": 1,
        "name": 1
      }},
      { "$sort": { isoCode: 1 } },
    ]);
  }

  static async getCountryByIsoCode(isoCode) {
    return Country.findOne({isoCode});
  }

  static async getCountryByIsoCodeService(isoCode) {
    return Country.findOne({isoCode}).select({
      _id: 1,
      isoCode: 1,
      name: 1,
    });
  }

  static async updateCountry(isoCode, updateData) {
    return Country.findOneAndUpdate({isoCode}, updateData, {new: true}).select({
      _id: 1,
      isoCode: 1,
      name: 1,
    });
  }

  static async deleteCountry(isoCode) {
    return Country.findOneAndDelete({isoCode}).select({
      _id: 1,
      isoCode: 1,
      name: 1,
    });
  }

  static async validateIsoCodes(isoCodes){
    logger.info(`[validateIsoCodes@CountryService] INIT isoCodes: ${isoCodes}`);
    let validIsoCodes = [];
    if(isoCodes.length){
      for (const isoCode of isoCodes) {
        const validIsoCode = await this.validateCountryIsoCode(isoCode, false);
        if(validIsoCode){
          validIsoCodes.push(validIsoCode);
        }
      }
      validIsoCodes = validIsoCodes.filter((item, index) => {
        return validIsoCodes.indexOf(item) === index;
      });
    }
    logger.info(`[validateIsoCodes@CountryService] FINISH validIsoCodes: ${validIsoCodes}`);
    return validIsoCodes;
  }

  static async validateCountryIsoCode(isoCode, throwException = false) {
    logger.info(`[validateCountryIsoCode@CountryService] INIT isoCode: ${isoCode}`);

    const countryExists = await this.getCountryByIsoCode(isoCode);
    if(countryExists){
      logger.info(`[validateCountryIsoCode@CountryService] FINISH`);
      return isoCode;
    }

    if(throwException){
      logger.info(`[validateCountryIsoCode@CountryService] FINISH throwException: ${throwException}`);
      throwError(errors.VALIDATION_FAILED, errors.RESOURCE_NOT_FOUND_MESSAGE + ": countryIsoCode");
    }

    logger.info(`[validateCountryIsoCode@CountryService] FINISH countryExists: false`);
  }

}