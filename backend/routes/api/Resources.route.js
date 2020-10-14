const express = require("express");
const mongoose = require("mongoose");
const ManagePGModel = require("../../models/ManagePG.model");
const ConfigurePGModel = require("../../models/ConfigurePG.model");

const router = express.Router();

// @route :: GET /api/resources/manage
// @desc :: This will get list of alreadt present Pgs/hostels data
// @access :: Public(dev) Private(production)
router.get("/manage", (req, res) => {
  // 1. count will be used for pagination
  // 2. querying data size wise
  let count;
  ManagePGModel.estimatedDocumentCount((err, num) => (count = num));
  ManagePGModel.find()
    .sort({ name: 1 })
    .then((items) => {
      res.json({
        error: false,
        count,
        data: items,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `ManagePG Model GET Error in file Resources.route.js --> ${err}`
      );
    });
});

// @route :: POST /api/resources/manage
// @desc :: This will add a new PG
// @access :: Public(dev) Private(production)
router.post("/manage", (req, res) => {
  // create the model
  const newItem = new ManagePGModel({
    name: req.body.name,
    pg_type: req.body.pg_type,
    address: req.body.address,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pincode: req.body.pincode,
    amenities: req.body.amenities,
    food_type: req.body.food_type,
    advanced_options: req.body.advanced_options,
    rent_percent: req.body.rent_percent,
  });

  // save the model at db
  newItem
    .save()
    .then((savedItem) => {
      const response = {
        error: false,
        data: savedItem,
      };
      res.json(response);
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `ManagePG Model POST Error in file Resources.route.js --> ${err}`
      );
    });
});

// @route :: PUT /api/resources/manage/:id
// @desc :: This will edit an existing PG
// @access :: Public(dev) Private(production)
router.put("/manage/:id", (req, res) => {
  // create the model
  let editItem = new ManagePGModel();
  console.log(`id to be edited :: ${req.params.id}`);
  editItem._id = req.params.id; // id: old value, rest are new ones
  editItem.name = req.body.name;
  editItem.pg_type = req.body.pg_type;
  editItem.address = req.body.address;
  editItem.landmark = req.body.landmark;
  editItem.city = req.body.city;
  editItem.state = req.body.state;
  editItem.country = req.body.country;
  editItem.pincode = req.body.pincode;
  editItem.amenities = req.body.amenities;
  editItem.food_type = req.body.food_type;
  editItem.advanced_options = req.body.advanced_options;
  editItem.rent_percent = req.body.rent_percent;

  // find and update the model with given id
  ManagePGModel.findByIdAndUpdate({ _id: req.params.id }, editItem, {
    new: true,
  })
    .then((editedItem) => {
      res.json({
        error: false,
        data: editedItem,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `ManagePG Model PUT Error in file Resources.route.js --> ${err}`
      );
    });
});

// @route :: DELETE /api/resources/manage/:id
// @desc :: This will delete the PG
// @access :: Public(dev) Private(production)
router.delete("/manage/:id", (req, res) => {
  ManagePGModel.findByIdAndDelete(req.params.id)
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
        `ManagePG Model DELETE Error in file Resources.route.js --> ${err}`
      );
    });
});

// @route :: POST /api/resources/configure
// @desc :: This will add the block, floor, rooms, flats, beds numbers
// @access :: Public(dev) Private(production)
router.post("/configure", (req, res) => {
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
router.get("/configure/:pg_id", (req, res) => {
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
router.put("/configure/:id", (req, res) => {
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
router.delete("/configure/:id", (req, res) => {
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
        `ManagePG Model DELETE Error in file Resources.route.js --> ${err}`
      );
    });
});

// export
module.exports = router;
