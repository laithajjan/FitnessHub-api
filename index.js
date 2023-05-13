const express = require('express');
const cors = require('cors');
const bmiRoutes = require('./src/routes/bmiRoutes');
const calorieRoutes = require('./src/routes/calorie');
const macroRoutes = require('./src/routes/macro');
const workoutRoutes = require('./src/routes/workoutRoutes');
const oneRepMaxRoutes = require('./src/routes/oneRepMaxRoutes');
const recipeFinderRoutes = require('./src/routes/recipeFinderRoutes'); // Add this line

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/bmi', bmiRoutes);
app.use('/calorie', calorieRoutes);
app.use('/macro', macroRoutes);
app.use('/workout', workoutRoutes);
app.use('/onerepmax', oneRepMaxRoutes);
app.use('/recipe', recipeFinderRoutes); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
