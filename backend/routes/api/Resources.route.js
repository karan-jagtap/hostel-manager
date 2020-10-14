const express = require("express");
const ManagePGModel = require("../../models/resources/ManagePG.model");
const ConfigurePGModel = require("../../models/resources/ConfigurePG.model");
const BlockModel = require("../../models/resources/Block.model");

const router = express.Router();

router.use("/manage", require("./Manage.router"));
router.use("/configure", require("./Configure.router"));
router.use("/block", require("./Block.router"));

// export
module.exports = router;
