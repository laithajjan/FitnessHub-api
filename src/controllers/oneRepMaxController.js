exports.calculateOneRepMax = (req, res) => {
  const { weight, reps, unit } = req.body;

  const weightLifted = unit === 'kg' ? weight : weight / 2.20462;
  const oneRepMax = weightLifted * (1 + reps * 0.0333);
  const oneRepMaxLbs = unit === 'lbs' ? oneRepMax * 2.20462 : oneRepMax;

  const percentages = [60, 65, 70, 75, 80, 85, 90, 95].map((percentage) => ({
    percentage,
    weight: (unit === 'kg' ? oneRepMax : oneRepMaxLbs) * (percentage / 100),
  }));

  res.json({ oneRepMax: unit === 'kg' ? oneRepMax.toFixed(1) : oneRepMaxLbs.toFixed(1), percentages });
};
