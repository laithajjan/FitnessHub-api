exports.calculateCalories = (req, res) => {
  const { age, gender, height, weight, activityLevel, unit } = req.body;

  const activityFactors = {
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  let heightInCm = height;
  let weightInKg = weight;

  if (unit === 'imperial') {
    heightInCm = height * 2.54;
    weightInKg = weight * 0.453592;
  }

  let bmr;
  if (gender === 'male') {
    bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
  }

  const maintenanceCalories = Math.round(bmr * activityFactors[activityLevel]);
  const mildLossCalories = maintenanceCalories - 250;
  const lossCalories = maintenanceCalories - 500;
  const extremeLossCalories = maintenanceCalories - 1000;

  res.json({
    calories: {
      maintenance: maintenanceCalories,
      mild_loss: mildLossCalories,
      loss: lossCalories,
      extreme_loss: extremeLossCalories,
    },
  });
};
