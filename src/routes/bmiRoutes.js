const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');

router.post('/', bmiController.calculateBMI);

module.exports = router;
