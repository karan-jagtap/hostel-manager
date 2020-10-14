const express = require("express");
const ConfigurePGModel = require("../../models/resources/ConfigurePG.model");

const router = express.Router();

// @route :: POST /api/resources/configure
// @desc :: This will add the block, floor, rooms, flats, beds numbers
// @access :: Public(dev) Private(production)
router.post("/", (req, res) => {
  const newItem = new ConfigurePGModel({
    pg_id: req.body.pg_id,
    pg_type: req.body.pg_type,
    blocks: req.body.blocks,
    floors: req.body.floors,
    rooms: req.body.rooms,
    beds: req.body.beds,
    flats: req.body.flats || 0,
  });

  newItem
    .save()
    .then((savedItem) => {
      res.json({
        error: false,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `ConfigurePG Model POST Error in file Resources.route.js --> ${err}`
      );
    });
});

// @route :: GET /api/resources/configure/:pg_id
// @desc :: This will get all the block, floor, rooms, flats, beds numbers
// @access :: Public(dev) Private(production)
router.get("/:pg_id", (req, res) => {
  const pg_id = req.params.pg_id;
  ConfigurePGModel.findOne({ pg_id })
    .then((item) => {
      res.json({
        error: false,
        data: item,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `ConfigurePG Model GET Error in file Resources.route.js --> ${err}`
      );
    });
});

// @route :: PUT /api/resources/configure/:id
// @desc :: This will edit the block, floor, rooms, flats, beds numbers
// @access :: Public(dev) Private(production)
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  let editItem = new ConfigurePGModel();
  editItem._id = _id;
  editItem.pg_type = req.params.pg_type;
  editItem.blocks = req.params.blocks;
  editItem.floors = req.params.floors;
  editItem.flats = req.params.flats;
  editItem.rooms = req.params.rooms;
  editItem.beds = req.params.beds;
  ConfigurePGModel.findByIdAndUpdate({ _id }, editItem, { new: true })
    .then((item) => {
      res.json({
        error: false,
        data: item,
      });
      console.log(item);
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `ConfigurePG Model GET Error in file Resources.route.js --> ${err}`
      );
    });
});

// @route :: DELETE /api/resources/configure/:id
// @desc :: This will delete the block, floor, rooms, flats, beds numbers
// @access :: Public(dev) Private(production)
router.delete("/:id", (req, res) => {
  ConfigurePGModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({
        error: false,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `ConfigurePG Model DELETE Error in file Resources.route.js --> ${err}`
      );
    });
});

module.exports = router;
