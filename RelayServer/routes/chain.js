// routes/chainRoutes.js

const express = require('express');
const router = express.Router();
const oraiController = require('../controllers/oraiController');
const solanaController = require('../controllers/solanaController');

router.post('/Oraichain/entry', oraiController.entry);
router.post('/Solana/entry', solanaController.entry);

module.exports = router;