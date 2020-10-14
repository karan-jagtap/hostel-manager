const mongoose = require("mongoose");

// @key :: column name
// @json :: column details
// @total_columns :: 3
// @required :: 2, id is dynamically required field
const RoomModel = mongoose.Schema({
  floor_id: {
    type: String,
  },
  flat_id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rooms", RoomModel);
