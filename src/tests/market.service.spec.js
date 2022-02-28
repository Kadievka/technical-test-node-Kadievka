import Market from "../models/Market";
import MarketService from "../services/market.service";
import CountryService from "../services/country.service"

const mockMarketLA = {
  "_id": {
    "$oid": "621a9558e3168b25246651f1"
  },
  "countryIsoCodes": [
    "VE",
    "PA",
    "CO",
    "AR",
    "MX"
  ],
  "marketCode": "M-LA",
  "name": "Latin america market",
};

const mockMarketEUR = {
  "_id": {
    "$oid": "621a9583e3168b25246651fa"
  },
  "countryIsoCodes": [
    "ESP",
    "FR",
    "GB",
    "IT"
  ],
  "marketCode": "M-EUR",
  "name": "Europe market",
};

const mockMarketAM = {
  "_id": {
    "$oid": "621a95b7e3168b2524665201"
  },
  "countryIsoCodes": [
    "USA",
    "CA"
  ],
  "marketCode": "M-AM",
  "name": "American market",
}

const marketService = MarketService.getInstance();
const countryService = CountryService.getInstance();

describe("market service unit tests", ()=>{

  beforeEach(()=>{
    jest.restoreAllMocks();
    MarketService.destroyInstance();
  });

  describe("getInstance", () => {
    it("should create a new instance of the service", () => {
      expect(marketService).toBeInstanceOf(MarketService);
    });

    it("should refer to the same singleton on multiple invocations", () => {
      const marketService1 = MarketService.getInstance();
      const marketService2 = MarketService.getInstance();

      expect(marketService1).toBe(marketService2);
    });
  });

  describe("createMarket", ()=>{
    it("should create market successfuly", async()=>{

      const mockMarketCreate = jest.spyOn(Market, 'create').mockReturnValue(mockMarketEUR);
      const mockGetMarketByCode = jest.spyOn(marketService, 'getMarketByCode').mockReturnValue(null);
      const mockValidateCountryIsoCodes = jest.spyOn(countryService, 'validateCountryIsoCodes').mockReturnValue([mockMarketEUR.countryIsoCodes]);

      const result = await marketService.createMarket(mockMarketEUR);

      expect(result).toEqual(mockMarketEUR);
      expect(mockMarketCreate).toHaveBeenCalledTimes(1);
      expect(mockGetMarketByCode).toHaveBeenCalledTimes(1);
      expect(mockValidateCountryIsoCodes).toHaveBeenCalledTimes(1);
    });
    it("should throw error if market already exists", async()=>{
      const mockGetMarketByCode = jest.spyOn(marketService, 'getMarketByCode').mockReturnValue(mockMarketEUR);

      await expect(marketService.createMarket(mockMarketEUR)).rejects.toThrowError();
      expect(mockGetMarketByCode).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllMarkets", ()=>{
    it("should return an aggregation to show all markets successfuly", async()=>{
      const mockMarketAggregate = jest.spyOn(Market, 'aggregate').mockReturnValue([
        mockMarketLA,
        mockMarketEUR,
        mockMarketAM,
      ]);

      const result = await marketService.getAllMarkets();

      expect(result).toEqual([
        mockMarketLA,
        mockMarketEUR,
        mockMarketAM,
      ]);
      expect(mockMarketAggregate).toHaveBeenCalledTimes(1);
    });
  });

  describe("getMarketByCode", ()=>{
    it("should return Market.findOne result", async()=>{
      const mockMarketFindOne = jest.spyOn(Market, 'findOne').mockReturnValue(mockMarketLA);

      const result = await marketService.getMarketByCode(mockMarketLA.marketCode);

      expect(result).toEqual(mockMarketLA);
      expect(mockMarketFindOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("getMarketByCodeService", ()=>{
    it("should return Market.findOne with select result", async() => {
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockMarketLA)
      };
      const mockMarketFindOne = jest.spyOn(Market, 'findOne').mockReturnValue(mockSelect);

      const result = await marketService.getMarketByCodeService(mockMarketLA.marketCode);

      expect(result).toEqual(mockMarketLA);
      expect(mockMarketFindOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateMarket", ()=>{
    it("should return Market.findOneAndUpdate select result", async() => {
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockMarketEUR)
      };
      const mockMarketFindOneAndUpdate = jest.spyOn(Market, 'findOneAndUpdate').mockReturnValue(mockSelect);
      const mockValidateCountryIsoCodes = jest.spyOn(countryService, 'validateCountryIsoCodes')
      .mockReturnValue([mockMarketEUR.countryIsoCodes]);

      const result = await marketService.updateMarket(mockMarketEUR.marketCode, mockMarketEUR);

      expect(result).toEqual(mockMarketEUR);
      expect(mockMarketFindOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(mockValidateCountryIsoCodes).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteMarket", ()=>{
    it("should return Market.findOneAndDelete result", async() => {
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockMarketLA)
      };
      const mockMarketFindOneAndDelete = jest.spyOn(Market, 'findOneAndDelete').mockReturnValue(mockSelect);

      const result = await marketService.deleteMarket(mockMarketLA.marketCode);

      expect(result).toEqual(mockMarketLA);
      expect(mockMarketFindOneAndDelete).toHaveBeenCalledTimes(1);
    });
  });
});
