const mongoose = require("mongoose");

// @key :: column name
// @json :: column details
// @total_columns :: 2
// @required :: 2
const FlatModel = mongoose.Schema({
  floor_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("flats", FlatModel);
