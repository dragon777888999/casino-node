// routes/chainRoutes.js

const express = require("express");
const router = express.Router();
const oraiController = require("../controllers/oraiController");
const solanaController = require("../controllers/solanaController");
const xrplController = require("../controllers/xrplController");
const tronController = require("../controllers/tronController");

router.post("/Oraichain/entry", oraiController.entry);
router.post("/Solana/entry", solanaController.entry);
router.post("/Xrpl/entry", xrplController.entry);
router.post("/Tron/entry", tronController.entry);

module.exports = router;
