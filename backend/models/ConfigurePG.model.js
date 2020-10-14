const mongoose = require("mongoose");

// @key :: column name
// @json :: column details
// @total_columns :: 7
// @required :: 6
const ConfigurePGModel = mongoose.Schema({
  pg_id: {
    type: String,
    required: true,
    unique: true,
  },
  pg_type: {
    type: Array,
    required: true,
  },
  blocks: {
    type: Number,
    required: true,
  },
  floors: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  flats: {
    type: Number,
  },
});

module.exports = mongoose.model("configure", ConfigurePGModel);
