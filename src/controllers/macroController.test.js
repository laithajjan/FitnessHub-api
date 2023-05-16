const { calculateMacros } = require('.//macroController');

describe('calculateMacros', () => {
  it('should calculate macros correctly', () => {
    const calories = 2000;
    const proteinPercentage = 0.3;
    const carbPercentage = 0.4;
    const fatPercentage = 0.3;

    const macros = calculateMacros(calories, proteinPercentage, carbPercentage, fatPercentage);

    expect(macros).toEqual({
      protein: 150,
      carbs: 200,
      fat: 67,
    });
  });
});
