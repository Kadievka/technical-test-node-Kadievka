import Transaction from "../models/Transaction";
import MarketService from "../services/market.service";
import CountryService from "../services/country.service"
import TransactionService from "../services/transaction.service";

const mockTransaction = {
  "_id": {
    "$oid": "621bb60a184d78385c7fa8c0"
  },
  "transactionDate": "25/02/2022",
  "unit": 100,
  "productReference": "443",
  "countryIsoCode": "USA",
  "transactionCode": 0,
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
};

const mockCountryUSA = {
  "_id": {
    "$oid": "621944a7f43e3a286004a5de"
  },
  "isoCode": "USA",
  "name": "Estados Unidos",
};

const marketService = MarketService.getInstance();
const countryService = CountryService.getInstance();
const transactionService = TransactionService.getInstance();

describe("transaction service unit tests", ()=>{

  beforeEach(()=>{
    jest.restoreAllMocks();
    TransactionService.destroyInstance();
  });

  describe("getTransactionSummary", ()=>{
    it("should return an aggregation with filters to show transactions successfuly", async()=>{

      const filterOptions = {
        dateFrom: "24/02/2022",
        dateTo: undefined,
        marketCode: "M-12",
        countryIsoCode: "USA",
      }

      const mockTransactionAggregate = jest.spyOn(Transaction, 'aggregate').mockReturnValue([{
        transactions:[
          mockTransaction,
          mockTransaction,
          mockTransaction,
        ],
        salesTotal: [{ id: 0, unit: 300}],
        returnsTotal: [{ id: 1, unit: 0}],
      }]);

      const mockGetMarketByCodeService = jest.spyOn(marketService, 'getMarketByCodeService').mockReturnValue(mockMarketAM);

      const mockValidateCountryIsoCode = jest.spyOn(countryService, 'validateCountryIsoCode').mockReturnValue(mockCountryUSA);

      const result = await transactionService.getTransactionSummary(filterOptions);

      expect(result).toEqual({
        transactions: [
          mockTransaction,
          mockTransaction,
          mockTransaction,
        ],
        salesTotal: 300,
        returnsTotal: 0
      });
      expect(mockTransactionAggregate).toHaveBeenCalledTimes(1);
      expect(mockGetMarketByCodeService).toHaveBeenCalledTimes(1);
      expect(mockValidateCountryIsoCode).toHaveBeenCalledTimes(1);
    });
    it("should return an aggregation with other filters to show transactions successfuly", async()=>{

      const filterOptions = {
        dateTo: "24/02/2022"
      }

      const mockTransactionAggregate = jest.spyOn(Transaction, 'aggregate').mockReturnValue([{
        transactions:[
          mockTransaction,
          mockTransaction,
          mockTransaction,
        ],
        salesTotal: [{ id: 0, unit: 300}],
        returnsTotal: [{ id: 1, unit: 0}],
      }]);

      const result = await transactionService.getTransactionSummary(filterOptions);

      expect(result).toEqual({
        transactions: [
          mockTransaction,
          mockTransaction,
          mockTransaction,
        ],
        salesTotal: 300,
        returnsTotal: 0
      });
      expect(mockTransactionAggregate).toHaveBeenCalledTimes(1);
    });
    it("should not modify the query.$match.countryIsoCode if country or market does not exist", async()=>{

      const filterOptions = {
        dateFrom: "24/02/2022",
        dateTo: "24/02/2022",
        marketCode: "M-13",
        countryIsoCode: "AU",
      }

      const mockTransactionAggregate = jest.spyOn(Transaction, 'aggregate').mockReturnValue([{
        transactions:[
          mockTransaction,
          mockTransaction,
          mockTransaction,
        ],
        salesTotal: [{ id: 0, unit: 300}],
        returnsTotal: [{ id: 1, unit: 0}],
      }]);

      const mockGetMarketByCodeService = jest.spyOn(marketService, 'getMarketByCodeService').mockReturnValue(null);

      const mockValidateCountryIsoCode = jest.spyOn(countryService, 'validateCountryIsoCode').mockReturnValue(null);

      const result = await transactionService.getTransactionSummary(filterOptions);

      expect(result).toEqual({
        transactions: [
          mockTransaction,
          mockTransaction,
          mockTransaction,
        ],
        salesTotal: 300,
        returnsTotal: 0
      });
      expect(mockTransactionAggregate).toHaveBeenCalledTimes(1);
      expect(mockGetMarketByCodeService).toHaveBeenCalledTimes(1);
      expect(mockValidateCountryIsoCode).toHaveBeenCalledTimes(1);
    });
    it("should return salesTotal or returnsTotal if there are not transactions", async()=>{

      const filterOptions = {
        dateFrom: "24/02/2022",
        dateTo: "24/02/2022",
        marketCode: "M-13",
        countryIsoCode: "AU",
      }

      const mockTransactionAggregate = jest.spyOn(Transaction, 'aggregate').mockReturnValue([{
        transactions:[],
        salesTotal: [],
        returnsTotal: [],
      }]);

      const mockGetMarketByCodeService = jest.spyOn(marketService, 'getMarketByCodeService').mockReturnValue(null);

      const mockValidateCountryIsoCode = jest.spyOn(countryService, 'validateCountryIsoCode').mockReturnValue(null);

      const result = await transactionService.getTransactionSummary(filterOptions);

      expect(result).toEqual({
        transactions: [],
        salesTotal: 0,
        returnsTotal: 0
      });
      expect(mockTransactionAggregate).toHaveBeenCalledTimes(1);
      expect(mockGetMarketByCodeService).toHaveBeenCalledTimes(1);
      expect(mockValidateCountryIsoCode).toHaveBeenCalledTimes(1);
    });
  });

  describe("getInstance", () => {
    it("should create a new instance of the service", () => {
      expect(transactionService).toBeInstanceOf(TransactionService);
    });

    it("should refer to the same singleton on multiple invocations", () => {
      const transactionService1 = TransactionService.getInstance();
      const transactionService2 = TransactionService.getInstance();

      expect(transactionService1).toBe(transactionService2);
    });
  });

  describe("createTransaction", ()=>{
    it("should create transaction successfuly", async()=>{
      const mockTransactionCreate = jest.spyOn(Transaction, 'create').mockReturnValue(mockTransaction);
      const mockValidateCountryIsoCode = jest.spyOn(countryService, 'validateCountryIsoCode').mockReturnValue(mockTransaction.countryIsoCode);
      const result = await transactionService.createTransaction(mockTransaction);
      expect(result).toEqual(mockTransaction);
      expect(mockTransactionCreate).toHaveBeenCalledTimes(1);
      expect(mockValidateCountryIsoCode).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllTransactions", ()=>{
    it("should return an aggregation to show all transactions successfuly", async()=>{
      const mockTransactionAggregate = jest.spyOn(Transaction, 'aggregate').mockReturnValue([
        mockTransaction,
        mockTransaction,
        mockTransaction,
      ]);

      const result = await transactionService.getAllTransactions();

      expect(result).toEqual([
        mockTransaction,
        mockTransaction,
        mockTransaction,
      ]);
      expect(mockTransactionAggregate).toHaveBeenCalledTimes(1);
    });
  });

  describe("getTransactionByIdService", ()=>{
    it("should return Transaction.findById result", async()=>{
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockTransaction)
      };
      const mockTransactionFindById = jest.spyOn(Transaction, 'findById').mockReturnValue(mockSelect);

      const result = await transactionService.getTransactionByIdService(mockTransaction._id);

      expect(result).toEqual(mockTransaction);
      expect(mockTransactionFindById).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateTransaction", ()=>{
    it("should update transaction successfuly", async()=>{
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockTransaction)
      };
      const mockTransactionCreate = jest.spyOn(Transaction, 'findByIdAndUpdate').mockReturnValue(mockSelect);
      const mockValidateCountryIsoCode = jest.spyOn(countryService, 'validateCountryIsoCode').mockReturnValue(mockTransaction.countryIsoCode);

      const result = await transactionService.updateTransaction(mockTransaction._id, mockTransaction);

      expect(result).toEqual(mockTransaction);
      expect(mockTransactionCreate).toHaveBeenCalledTimes(1);
      expect(mockValidateCountryIsoCode).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteTransaction", ()=>{
    it("should return Transaction.findOneAndDelete result", async() => {
      const mockSelect = {
        select: jest.fn().mockReturnValue(mockTransaction)
      };
      const mockTransactionFindOneAndDelete = jest.spyOn(Transaction, 'findOneAndDelete').mockReturnValue(mockSelect);

      const result = await transactionService.deleteTransaction(mockTransaction._id);

      expect(result).toEqual(mockTransaction);
      expect(mockTransactionFindOneAndDelete).toHaveBeenCalledTimes(1);
    });
  });
});