// routes/chainRoutes.js

const express = require("express");
const router = express.Router();
const oraiController = require("../controllers/oraiController");
const solanaController = require("../controllers/solanaController");
const xrplController = require("../controllers/xrplController");

router.post("/Oraichain/entry", oraiController.entry);
router.post("/Solana/entry", solanaController.entry);
router.post("/xrpl/entry", xrplController.entry);

module.exports = router;
