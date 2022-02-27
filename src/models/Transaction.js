import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseDelete from "mongoose-delete";
import { today } from "../utils/dateUtil";

export const TransactionCodeOptions = {
  "SALE": 0,
  "RETURNED": 1
};

const transactionSchema = new mongoose.Schema(
  {
    transactionDate: {
      type: String,
      required: true,
      default: today(),
    },
    productReference: {
      type: String,
      required: true,
    },
    countryIsoCode: {
      type: String,
      required: true,
    },
    transactionCode: {
      type: Number,
      enum: TransactionCodeOptions,
      required: true,
    },
    unit: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.plugin(mongoosePaginate);
transactionSchema.plugin(mongooseDelete, {
  overrideMethods: true,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;