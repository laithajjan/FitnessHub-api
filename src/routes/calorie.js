const express = require('express');
const router = express.Router();
const calorieController = require('../controllers/calorie');

router.post('/', calorieController.calculateCalories);

module.exports = router;
