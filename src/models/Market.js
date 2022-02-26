import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseDelete from "mongoose-delete";

const marketSchema = new mongoose.Schema(
  {
    marketCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    countryIsoCodes: [{
      type: String,
    }]
  },
  {
    timestamps: true,
  }
);

marketSchema.plugin(mongoosePaginate);
marketSchema.plugin(mongooseDelete, {
  overrideMethods: true,
});

const Market = mongoose.model("Market", marketSchema);

export default Market;