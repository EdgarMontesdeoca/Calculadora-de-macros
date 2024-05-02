let gender = '';

function setGender(g) {
    gender = g;
    // Remover la clase 'selected' de todos los botones
    const buttons = document.querySelectorAll('.gender-buttons button');
    buttons.forEach(button => {
        button.classList.remove('selected');
        if (button.id === g) {
            button.classList.add('selected');
        }
    });
}

function calculateMacros() {
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const goal = document.getElementById('goal').value;
    const activityLevel = document.getElementById('activity-level').value;

    if (isNaN(height) || isNaN(age) || isNaN(weight) || gender === '' || goal === '' || activityLevel === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let caloriesNeeded;
    switch (activityLevel) {
        case 'sedentary':
            caloriesNeeded = bmr * 1.2;
            break;
        case 'lightly-active':
            caloriesNeeded = bmr * 1.375;
            break;
        case 'moderately-active':
            caloriesNeeded = bmr * 1.55;
            break;
        case 'very-active':
            caloriesNeeded = bmr * 1.725;
            break;
        case 'extra-active':
            caloriesNeeded = bmr * 1.9;
            break;
    }

    let calorieAdjustment;
    switch (goal) {
        case 'maintain':
            calorieAdjustment = 0;
            break;
        case 'lose':
            calorieAdjustment = -500;
            break;
        case 'gain':
            calorieAdjustment = 500;
            break;
    }

    caloriesNeeded += calorieAdjustment;

    const protein = weight * 2.2 * 0.8; // 0.8 grams per pound of body weight
    const fat = (caloriesNeeded * 0.25) / 9; // 25% of calories from fat
    const carbs = (caloriesNeeded - (protein * 4) - (fat * 9)) / 4;

    const proteinDaily = protein.toFixed(2);
    const fatDaily = fat.toFixed(2);
    const carbsDaily = carbs.toFixed(2);

    document.getElementById('result').innerHTML = `
        <h3>Resultados:</h3>
        <p>Calorías Necesarias: ${caloriesNeeded.toFixed(2)}</p>
        <p>Proteína Diaria: ${proteinDaily}g</p>
        <p>Carbohidratos Diarios: ${carbsDaily}g</p>
        <p>Grasas Diarias: ${fatDaily}g</p>
    `;
}
