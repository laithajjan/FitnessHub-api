const activityFactors = {
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const calculateBMR = (age, gender, height, weight) => {
  return (
    10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161)
  );
};

const calculateMacros = (calories, proteinPercentage, carbPercentage, fatPercentage) => {
  const proteinGrams = Math.round((calories * proteinPercentage) / 4);
  const carbGrams = Math.round((calories * carbPercentage) / 4);
  const fatGrams = Math.round((calories * fatPercentage) / 9);

  return { protein: proteinGrams, carbs: carbGrams, fat: fatGrams };
};

exports.calculateMacros = (req, res) => {
  const { age, gender, height, weight, activityLevel, goal, unit } = req.body;

  let heightInCm = height;
  let weightInKg = weight;

  if (unit === 'imperial') {
    heightInCm = height * 2.54;
    weightInKg = weight * 0.453592;
  }

  const bmr = calculateBMR(age, gender, heightInCm, weightInKg);
  const maintenanceCalories = Math.round(bmr * activityFactors[activityLevel]);

  let goalCalories = maintenanceCalories;

  switch (goal) {
    case 'mild_loss':
      goalCalories -= 250;
      break;
    case 'loss':
      goalCalories -= 500;
      break;
    case 'extreme_loss':
      goalCalories -= 1000;
      break;
    case 'mild_gain':
      goalCalories += 250;
      break;
    case 'gain':
      goalCalories += 500;
      break;
    case 'extreme_gain':
      goalCalories += 1000;
      break;
    default:
      break;
  }

  const balancedMacros = calculateMacros(goalCalories, 0.3, 0.4, 0.3);
  const lowFatMacros = calculateMacros(goalCalories, 0.3, 0.5, 0.2);
  const lowCarbMacros = calculateMacros(goalCalories, 0.35, 0.25, 0.4);
  const highProteinMacros = calculateMacros(goalCalories, 0.4, 0.3, 0.3);

  res.json({
    'Balanced': balancedMacros,
    'Low Fat': lowFatMacros,
    'Low Carb': lowCarbMacros,
    'High Protein': highProteinMacros,
  });
};
