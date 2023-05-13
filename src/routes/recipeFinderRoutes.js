const express = require('express');
const router = express.Router();
const recipeFinderController = require('../controllers/recipeFinderController');

router.get('/', recipeFinderController.getRecipes);

module.exports = router;
