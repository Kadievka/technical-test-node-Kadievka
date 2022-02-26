import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseDelete from "mongoose-delete";

const countrySchema = new mongoose.Schema(
  {
    isoCode: {
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
    }
  },
  {
    timestamps: true,
  }
);

countrySchema.plugin(mongoosePaginate);
countrySchema.plugin(mongooseDelete, {
  overrideMethods: true,
});

const Country = mongoose.model("Country", countrySchema);

export default Country;