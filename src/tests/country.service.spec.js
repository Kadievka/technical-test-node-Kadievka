import Country from "../models/Country";
import CountryService from "../services/country.service";

const mockCreatedCountry = {
  "_id": {
    "$oid": "621944a7f43e3a286004a5dd"
  },
  "isoCode": "ESP",
  "name": "España",
};

const mockCreatedOtherCountry = {
  "_id": {
    "$oid": "621944a7f43e3a286004a5de"
  },
  "isoCode": "USA",
  "name": "Estados Unidos",
};

const mockCountryData = {
  "isoCode": "ESP",
  "name": "España",
}

const countryService = CountryService.getInstance();

describe("country service unit tests", ()=>{

  beforeEach(()=>{
    jest.restoreAllMocks();
    CountryService.destroyInstance();
  });

  describe("getInstance", () => {
    it("should create a new instance of the service", () => {
      expect(countryService).toBeInstanceOf(CountryService);
    });

    it("should refer to the same singleton on multiple invocations", () => {
      const countryService1 = CountryService.getInstance();
      const countryService2 = CountryService.getInstance();

      expect(countryService1).toBe(countryService2);
    });
  });

  describe("createCountry", ()=>{
    it("should create country successfuly", async()=>{
      const mockCountryCreate = jest.spyOn(Country, 'create').mockReturnValue(mockCreatedCountry);
      const mockGetCountryByIsoCode = jest.spyOn(countryService, 'getCountryByIsoCode').mockReturnValue(null);

      const result = await countryService.createCountry(mockCountryData);

      expect(result).toEqual(mockCreatedCountry);
      expect(mockCountryCreate).toHaveBeenCalledTimes(1);
      expect(mockGetCountryByIsoCode).toHaveBeenCalledTimes(1);
    });
    it("should throw error if country already exists", async()=>{
      const mockGetCountryByIsoCode = jest.spyOn(countryService, 'getCountryByIsoCode').mockReturnValue(mockCreatedCountry);

      await expect(countryService.createCountry(mockCountryData)).rejects.toThrowError();
      expect(mockGetCountryByIsoCode).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllCountries", ()=>{
    it("should return an aggregation to show all countries successfuly", async()=>{
      const mockCountryAggregate = jest.spyOn(Country, 'aggregate').mockReturnValue([mockCreatedCountry, mockCreatedOtherCountry]);

      const result = await countryService.getAllCountries();

      expect(result).toEqual([mockCreatedCountry, mockCreatedOtherCountry]);
      expect(mockCountryAggregate).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCountryByIsoCode", ()=>{
    it("should return Country.findOne result", async()=>{
      const mockCountryFindOne = jest.spyOn(Country, 'findOne').mockReturnValue(mockCreatedOtherCountry);

      const result = await countryService.getCountryByIsoCode(mockCreatedOtherCountry.isoCode);

      expect(result).toEqual(mockCreatedOtherCountry);
      expect(mockCountryFindOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCountryByIsoCodeService", ()=>{
    it("should return Country.findOne with select result", async() => {
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockCreatedCountry)
      };
      const mockCountryFindOne = jest.spyOn(Country, 'findOne').mockReturnValue(mockSelect);

      const result = await countryService.getCountryByIsoCodeService(mockCountryData.isoCode);

      expect(result).toEqual(mockCreatedCountry);
      expect(mockCountryFindOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateCountry", ()=>{
    it("should return Country.findOneAndUpdate select result", async() => {
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockCreatedCountry)
      };
      const mockCountryFindOneAndUpdate = jest.spyOn(Country, 'findOneAndUpdate').mockReturnValue(mockSelect);

      const result = await countryService.updateCountry(mockCountryData.isoCode, mockCountryData);

      expect(result).toEqual(mockCreatedCountry);
      expect(mockCountryFindOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteCountry", ()=>{
    it("should return Country.findOneAndDelete result", async() => {
      const mockSelect = {
        select: jest.fn().mockReturnValue({})
      };
      const mockCountryFindOneAndDelete = jest.spyOn(Country, 'findOneAndDelete').mockReturnValue(mockSelect);

      const result = await countryService.deleteCountry(mockCreatedOtherCountry.isoCode);

      expect(result).toEqual({});
      expect(mockCountryFindOneAndDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("validateCountryIsoCodes", ()=>{
    it("should return an array with valid isoCodes without duplicated isoCode", async() => {
      const mockValidateCountryIsoCode = jest.spyOn(countryService, 'validateCountryIsoCode')
      .mockReturnValueOnce(mockCreatedCountry.isoCode)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockCreatedOtherCountry.isoCode)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(mockCreatedOtherCountry.isoCode);

      const result = await countryService.validateCountryIsoCodes([
        mockCreatedCountry.isoCode,
        "ABC",
        mockCreatedOtherCountry.isoCode,
        "ERR",
        mockCreatedOtherCountry.isoCode,
      ]);

      expect(result).toEqual([
        mockCreatedCountry.isoCode,
        mockCreatedOtherCountry.isoCode,
      ])
      expect(mockValidateCountryIsoCode).toHaveBeenCalledTimes(5);
    });
    it("should return [] if isoCodes array is empty", async() => {
      const result = await countryService.validateCountryIsoCodes([]);
      expect(result).toEqual([])
    });
  });

  describe("validateCountryIsoCode", ()=>{
    it("should return valid isoCode if throw exception is false", async() => {
      const mockGetCountryByIsoCode = jest.spyOn(countryService, 'getCountryByIsoCode').mockReturnValue(mockCreatedCountry);

      const result = await countryService.validateCountryIsoCode(mockCountryData.isoCode);

      expect(result).toEqual(mockCreatedCountry.isoCode)
      expect(mockGetCountryByIsoCode).toHaveBeenCalledTimes(1);
    });
    it("should return undefined if throw exception is false and isoCode is invalid", async() => {
      const mockGetCountryByIsoCode = jest.spyOn(countryService, 'getCountryByIsoCode').mockReturnValue(null);

      const result = await countryService.validateCountryIsoCode(mockCountryData.isoCode);

      expect(result).toEqual(undefined);
      expect(mockGetCountryByIsoCode).toHaveBeenCalledTimes(1);
    });
    it("should throw error if throw exception is true and isoCode is invalid", async() => {
      const mockGetCountryByIsoCode = jest.spyOn(countryService, 'getCountryByIsoCode').mockReturnValue(null);

      await expect(countryService.validateCountryIsoCode(mockCountryData.isoCode, true)).rejects.toThrowError();

      expect(mockGetCountryByIsoCode).toHaveBeenCalledTimes(1);
    });
  });

});