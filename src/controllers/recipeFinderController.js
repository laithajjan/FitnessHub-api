const axios = require('axios');

exports.getRecipes = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/recipe?query=${req.query.query}`,
      {
        headers: {
          'X-Api-Key': process.env.RECIPE_FINDER_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};
