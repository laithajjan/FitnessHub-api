const { calculateCalories } = require('./calorie');

describe('calculateCalories', () => {
  it('should calculate calories correctly when gender is male', () => {
    const req = {
      body: {
        age: 30,
        gender: 'male',
        height: 180,
        weight: 80,
        activityLevel: 'moderate',
        unit: 'metric',
      },
    };
    const res = {
      json: jest.fn(),
    };

    calculateCalories(req, res);

    expect(res.json).toHaveBeenCalledWith({
      calories: {
        maintenance: 2534,
        mild_loss: 2284,
        loss: 2034,
        extreme_loss: 1534,
      },
    });
  });

  it('should calculate calories correctly when gender is female', () => {
    const req = {
      body: {
        age: 25,
        gender: 'female',
        height: 160,
        weight: 60,
        activityLevel: 'active',
        unit: 'metric',
      },
    };
    const res = {
      json: jest.fn(),
    };

    calculateCalories(req, res);

    expect(res.json).toHaveBeenCalledWith({
      calories: {
        maintenance: 2468,
        mild_loss: 2218,
        loss: 1968,
        extreme_loss: 1468,
      },
    });
  });
});
