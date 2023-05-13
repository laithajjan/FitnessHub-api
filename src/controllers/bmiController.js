const calculateBMI = (req, res) => {
    const { heightCm, heightFt, heightIn, weightKg, weightLbs } = req.body;

    let heightM, weight;

    if (heightCm && weightKg) {
        heightM = heightCm / 100;
        weight = weightKg;
    } else if (heightFt && heightIn && weightLbs) {
        const heightInches = heightFt * 12 + parseInt(heightIn);
        heightM = heightInches * 0.0254;
        weight = weightLbs / 2.20462;
    } else {
        return res.status(400).json({ error: 'Height and weight are required' });
    }

    const bmi = weight / (heightM * heightM);
    let category;

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    res.json({ bmi, category });
};

module.exports = {
    calculateBMI,
};