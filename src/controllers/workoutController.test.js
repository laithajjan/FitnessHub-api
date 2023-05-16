const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { generateWorkout } = require('./controllers');

describe('generateWorkout', () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('should return a workout suggestion when API call is successful', async () => {
    const req = {
      body: {
        gender: 'male',
        primaryGoal: 'build muscle',
        trainingMethod: 'weightlifting',
        workoutType: 'full body',
        routineFocus: 'strength',
        strengthLevel: 'intermediate',
        trainingDays: 4,
        workoutTime: 60,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const responseData = {
      choices: [
        {
          text: 'Sample workout suggestion',
        },
      ],
    };
    mockAxios
      .onPost('https://api.openai.com/v1/engines/curie/completions')
      .reply(200, responseData);

    await generateWorkout(req, res);

    expect(res.json).toHaveBeenCalledWith({ workoutSuggestion: 'Sample workout suggestion' });
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return an error message when API call fails', async () => {
    const req = {
      body: {
        gender: 'male',
        primaryGoal: 'build muscle',
        trainingMethod: 'weightlifting',
        workoutType: 'full body',
        routineFocus: 'strength',
        strengthLevel: 'intermediate',
        trainingDays: 4,
        workoutTime: 60,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    mockAxios
      .onPost('https://api.openai.com/v1/engines/curie/completions')
      .networkError();

    await generateWorkout(req, res);

    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error generating workout plan' });
  });
});
