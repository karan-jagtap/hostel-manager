const express = require("express");
const BlockModel = require("../../models/resources/Block.model");

const router = express.Router();

// @route :: POST /api/resources/block
// @desc :: Add new Block to PG
// @access :: Public(dev) Private(production)
router.post("/block", (req, res) => {
  const newItem = new BlockModel({
    pg_id: req.body.pg_id,
    name: req.body.name,
  });

  newItem
    .save()
    .then((savedItem) => {
      res.json({
        error: false,
        data: savedItem,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err,
      });
      console.log(
        `Block Model POST Error in file Resources.route.js --> ${err}`
      );
    });
});

module.exports = router;
