const mongoose = require("mongoose");

// @key :: column name
// @json :: column details
// @total_columns :: 12
// @required :: 9
const ManagePGModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pg_type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "India",
  },
  pincode: {
    type: Number,
    required: true,
  },
  amenities: {
    type: Array,
  },
  food_type: {
    type: Array,
  },
  advanced_options: {
    type: Array,
  },
  rent_percent: {
    type: Number,
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("manage", ManagePGModel);
