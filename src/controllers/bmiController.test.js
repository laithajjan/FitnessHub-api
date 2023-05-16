const { calculateBMI } = require('./bmiController');

describe('calculateBMI', () => {
  it('should calculate BMI correctly when height and weight are in metric units', () => {
    const req = {
      body: {
        heightCm: 180,
        weightKg: 75,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    calculateBMI(req, res);

    expect(res.json).toHaveBeenCalledWith({
      bmi: 23.15,
      category: 'Normal weight',
    });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should calculate BMI correctly when height and weight are in imperial units', () => {
    const req = {
      body: {
        heightFt: 5,
        heightIn: 10,
        weightLbs: 165,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    calculateBMI(req, res);

    expect(res.json).toHaveBeenCalledWith({
      bmi: 23.66,
      category: 'Normal weight',
    });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return an error when height and weight are not provided', () => {
    const req = {
      body: {},
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    calculateBMI(req, res);

    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Height and weight are required' });
  });
});
