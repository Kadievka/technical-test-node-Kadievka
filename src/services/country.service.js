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
      id: createdCountry.id,
      isoCode: createdCountry.isoCode,
      name: createdCountry.name,
    }
  }

  static async getAllCountries() {
    return Country.aggregate([
      {"$project": {
        "id": 1,
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
      id: 1,
      isoCode: 1,
      name: 1,
    });
  }

  static async updateCountry(isoCode, updateData) {
    return Country.findOneAndUpdate({isoCode}, updateData, {new: true}).select({
      id: 1,
      isoCode: 1,
      name: 1,
    });
  }

  static async deleteCountry(isoCode) {
    return Country.findOneAndDelete({isoCode}).select({
      id: 1,
      isoCode: 1,
      name: 1,
    });
  }

}