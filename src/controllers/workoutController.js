const axios = require('axios');

exports.generateWorkout = async (req, res) => {
  const {
    gender,
    primaryGoal,
    trainingMethod,
    workoutType,
    routineFocus,
    strengthLevel,
    trainingDays,
    workoutTime,
  } = req.body;

  const prompt = `Generate a workout plan for a ${gender} who wants to ${primaryGoal} using ${trainingMethod} for ${workoutType} exercises with a focus on ${routineFocus}. Their strength level is ${strengthLevel}, and they want to train ${trainingDays} days a week for ${workoutTime} minutes per session. Fit the whole workout plan in 500 words maximum`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/curie/completions',
      {
        prompt,
        max_tokens: 800,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const workoutSuggestion = response.data.choices[0].text.trim();

    res.json({ workoutSuggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating workout plan' });
  }
};
