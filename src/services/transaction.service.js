import Transaction, { TransactionCodeOptions } from "../models/Transaction";
import log4js from "log4js";
import CountryService from "./country.service";
import { today } from "../utils/dateUtil";
import MarketService from "./market.service";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

export default class TransactionService {

  countryService;

  marketService;

  constructor() {
    this.countryService = CountryService.getInstance();
    this.marketService = MarketService.getInstance();
  }

  static getInstance() {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }

    return TransactionService.instance;
  }

  static destroyInstance(){
    delete this.instance;
  }

  async getTransactionSummary(filterOptions) {
    logger.info(`[getTransactionSummary@TransactionService] INIT filterOptions: ${filterOptions}`);

    if (!filterOptions.dateTo) {
      filterOptions.dateTo = today();
    }

    let query = {
      $match: {
        transactionDate: { $gte: filterOptions.dateFrom, $lte: filterOptions.dateTo },
      },
    };

    if (filterOptions.marketCode) {
      const market = await this.marketService.getMarketByCodeService(filterOptions.marketCode);
      if (market) {
        query.$match.countryIsoCode = { $in: market.countryIsoCodes };
      }
    }

    if (filterOptions.countryIsoCode) {
      const country = await this.countryService.validateCountryIsoCode(filterOptions.countryIsoCode);
      if (country) {
        query.$match.countryIsoCode = { $eq: filterOptions.countryIsoCode };
      }
    }

    const salesQuery = {
      $match: { ...query.$match, transactionCode: { $eq: TransactionCodeOptions.SALE } },
    };

    const returnsQuery = {
      $match: { ...query.$match, transactionCode: { $eq: TransactionCodeOptions.RETURNED } },
    };

    const result = await Transaction.aggregate([
      {
        $facet: {
          transactions: [
            query,
            {
              $project: {
                _id: 1,
                transactionDate: 1,
                productReference: 1,
                countryIsoCode: 1,
                transactionCode: 1,
                unit: 1,
              },
            },
            { $sort: { transactionDate: 1 } },
          ],
          salesTotal: [salesQuery, { $group: { _id: TransactionCodeOptions.SALE, unit: { $sum: "$unit" } } }],
          returnsTotal: [returnsQuery, { $group: { _id: TransactionCodeOptions.RETURNED, unit: { $sum: "$unit" } } }],
        },
      },
    ]);

    logger.info("[getTransactionSummary@TransactionService] FINISH");

    return {
      transactions: result[0].transactions,
      salesTotal: result[0].salesTotal[0] ? result[0].salesTotal[0].unit : 0,
      returnsTotal: result[0].returnsTotal[0] ? result[0].returnsTotal[0].unit : 0,
    };
  }

  async createTransaction(transaction) {
    logger.info("[createTransaction@TransactionService] INIT");
    await this.countryService.validateCountryIsoCode(transaction.countryIsoCode, true);
    const createdTransaction = await Transaction.create(transaction);
    logger.info("[createTransaction@TransactionService] FINISH");
    return {
      _id: createdTransaction._id,
      transactionDate: createdTransaction.transactionDate,
      productReference: createdTransaction.productReference,
      countryIsoCode: createdTransaction.countryIsoCode,
      transactionCode: createdTransaction.transactionCode,
      unit: createdTransaction.unit,
    };
  }

  async getAllTransactions() {
    return Transaction.aggregate([
      {
        $project: {
          _id: 1,
          transactionDate: 1,
          productReference: 1,
          countryIsoCode: 1,
          transactionCode: 1,
          unit: 1,
        },
      },
      { $sort: { transactionDate: 1 } },
    ]);
  }

  async getTransactionByIdService(_id) {
    return Transaction.findById(_id).select({
      _id: 1,
      transactionDate: 1,
      productReference: 1,
      countryIsoCode: 1,
      transactionCode: 1,
      unit: 1,
    });
  }

  async updateTransaction(_id, updateData) {
    await this.countryService.validateCountryIsoCode(updateData.countryIsoCode, true);
    return Transaction.findByIdAndUpdate(_id, updateData, { new: true }).select({
      _id: 1,
      transactionDate: 1,
      productReference: 1,
      countryIsoCode: 1,
      transactionCode: 1,
      unit: 1,
    });
  }

  async deleteTransaction(_id) {
    return Transaction.findByIdAndDelete(_id).select({
      _id: 1,
      transactionDate: 1,
      productReference: 1,
      countryIsoCode: 1,
      transactionCode: 1,
      unit: 1,
    });
  }
}
