const express = require('express');
const router = express.Router();
const macroController = require('../controllers/macroController');

router.post('/', macroController.calculateMacros);

module.exports = router;
