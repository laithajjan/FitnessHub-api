const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { getRecipes } = require('./recipeFinderController');

describe('getRecipes', () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('should return recipes when API call is successful', async () => {
    const req = { query: { query: 'chicken' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const responseData = { recipes: ['recipe1', 'recipe2'] };
    mockAxios
      .onGet('https://api.api-ninjas.com/v1/recipe?query=chicken')
      .reply(200, responseData);

    await getRecipes(req, res);

    expect(res.json).toHaveBeenCalledWith(responseData);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return an error message when API call fails', async () => {
    const req = { query: { query: 'chicken' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    mockAxios
      .onGet('https://api.api-ninjas.com/v1/recipe?query=chicken')
      .networkError();

    await getRecipes(req, res);

    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching recipes' });
  });
});
