const { calculateOneRepMax } = require('./oneRepMaxController');

describe('calculateOneRepMax', () => {
  it('should calculate one-rep max and percentages correctly when weight is in kg', () => {
    const req = {
      body: {
        weight: 100,
        reps: 5,
        unit: 'kg',
      },
    };
    const res = {
      json: jest.fn(),
    };

    calculateOneRepMax(req, res);

    expect(res.json).toHaveBeenCalledWith({
      oneRepMax: '116.6',
      percentages: [
        { percentage: 60, weight: 69.96 },
        { percentage: 65, weight: 75.79 },
        { percentage: 70, weight: 81.62 },
        { percentage: 75, weight: 87.45 },
        { percentage: 80, weight: 93.28 },
        { percentage: 85, weight: 99.11 },
        { percentage: 90, weight: 104.94 },
        { percentage: 95, weight: 110.77 },
      ],
    });
  });

  it('should calculate one-rep max and percentages correctly when weight is in lbs', () => {
    const req = {
      body: {
        weight: 200,
        reps: 5,
        unit: 'lbs',
      },
    };
    const res = {
      json: jest.fn(),
    };

    calculateOneRepMax(req, res);

    expect(res.json).toHaveBeenCalledWith({
      oneRepMax: '233.3',
      percentages: [
        { percentage: 60, weight: 139.98 },
        { percentage: 65, weight: 150.98 },
        { percentage: 70, weight: 161.98 },
        { percentage: 75, weight: 172.98 },
        { percentage: 80, weight: 183.98 },
        { percentage: 85, weight: 194.98 },
        { percentage: 90, weight: 205.98 },
        { percentage: 95, weight: 216.98 },
      ],
    });
  });
});
