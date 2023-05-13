const express = require('express');
const router = express.Router();
const oneRepMaxController = require('../controllers/oneRepMaxController');

router.post('/', oneRepMaxController.calculateOneRepMax);

module.exports = router;
