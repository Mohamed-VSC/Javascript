let rollCount = 0;
const maxRolls = 3; 
let values = [];
let heldDice = [false, false, false, false, false];
const diceImages = document.querySelectorAll('.diceImage');

function holdNumbers(index) {
    heldDice[index] = !heldDice[index];
    diceImages[index].classList.toggle('held', heldDice[index]); 
}

diceImages.forEach((diceImage, index) => {
    diceImage.addEventListener('click', () => holdNumbers(index));
});

function countNumber(getal){
    let teller = 0;
    for (let index = 0; index < values.length; index++) {
        if (values[index] == getal) {
            teller++;
        }
    }
    return teller;
}

function throwDice() {
    for (let i = 0; i < 5; i++) {
        if (!heldDice[i]) {
            const randomValue = createRandomDice();
            values[i] = randomValue;
            updateDiceUIImages(i, randomValue); 
        }
    }
}

function createRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDiceUIImages(index, value) {
    diceImages[index].src = `images/${value}.png`;
}

function calculateUpperSection() {
    let ones = countNumber(1) * 1;
    let twos = countNumber(2) * 2;
    let threes = countNumber(3) * 3;
    let fours = countNumber(4) * 4;
    let fives = countNumber(5) * 5;
    let sixes = countNumber(6) * 6;
    let sum = ones + twos + threes + fours + fives + sixes;
    let bonus = (sum >= 63) ? 35 : 0;  // Bonus als de som >= 63 is

    // Update de tabel in de UI
    document.querySelector('tr:nth-child(2) td:nth-child(2)').innerText = ones;
    document.querySelector('tr:nth-child(3) td:nth-child(2)').innerText = twos;
    document.querySelector('tr:nth-child(4) td:nth-child(2)').innerText = threes;
    document.querySelector('tr:nth-child(5) td:nth-child(2)').innerText = fours;
    document.querySelector('tr:nth-child(6) td:nth-child(2)').innerText = fives;
    document.querySelector('tr:nth-child(7) td:nth-child(2)').innerText = sixes;
    document.querySelector('tr:nth-child(8) td:nth-child(2)').innerText = sum;
    document.querySelector('tr:nth-child(9) td:nth-child(2)').innerText = bonus;
}

function calculateThreeOfAKind() {
    for (let i = 1; i <= 6; i++) {
        if (countNumber(i) >= 3) {
            let total = values.reduce((a, b) => a + b, 0);  
            document.querySelector('tr:nth-child(10) td:nth-child(2)').innerText = total;
            return;
        }
    }
    document.querySelector('tr:nth-child(10) td:nth-child(2)').innerText = 0;  
}

function calculateFourOfAKind() {
    for (let i = 1; i <= 6; i++) {
        if (countNumber(i) >= 4) {
            let total = values.reduce((a, b) => a + b, 0);
            document.querySelector('tr:nth-child(11) td:nth-child(2)').innerText = total;
            return;
        }
    }
    document.querySelector('tr:nth-child(11) td:nth-child(2)').innerText = 0;  
}

function calculateFullHouse() {
    let hasThree = false;
    let hasTwo = false;

    for (let i = 1; i <= 6; i++) {
        if (countNumber(i) === 3) hasThree = true;
        if (countNumber(i) === 2) hasTwo = true;
    }

    if (hasThree && hasTwo) {
        document.querySelector('tr:nth-child(12) td:nth-child(2)').innerText = 25; 
    } else {
        document.querySelector('tr:nth-child(12) td:nth-child(2)').innerText = 0;
    }
}

function calculateSmallStraight() {
    const straights = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
    let straightFound = straights.some(straight => straight.every(num => countNumber(num) > 0));

    document.querySelector('tr:nth-child(13) td:nth-child(2)').innerText = straightFound ? 30 : 0;
}

function calculateLargeStraight() {
    const straights = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]];
    let straightFound = straights.some(straight => straight.every(num => countNumber(num) > 0));

    document.querySelector('tr:nth-child(14) td:nth-child(2)').innerText = straightFound ? 40 : 0;
}

function calculateChance() {
    let total = values.reduce((a, b) => a + b, 0);
    document.querySelector('tr:nth-child(15) td:nth-child(2)').innerText = total;
}

function calculateYahtzee() {
    for (let i = 1; i <= 6; i++) {
        if (countNumber(i) === 5) {
            document.querySelector('tr:nth-child(16) td:nth-child(2)').innerText = 50;
            return;
        }
    }
    document.querySelector('tr:nth-child(16) td:nth-child(2)').innerText = 0;
}

function calculateTotalSum() {
    let total = 0;
    const scoreCells = document.querySelectorAll('table td:nth-child(2)');
    scoreCells.forEach(cell => {
        total += parseInt(cell.innerText) || 0;  
    });
    document.querySelector('tr:nth-child(17) td:nth-child(2)').innerText = total;
}

function resetScores() {
    const scoreCells = document.querySelectorAll('table td:nth-child(2)');
    scoreCells.forEach(cell => {
        cell.innerText = '0';  
    });
}


document.getElementById('rollButton').onclick = function() {
    resetScores();

    if (rollCount < maxRolls) {
        rollCount++; 
        throwDice(); 

        const rollsLeft = maxRolls - rollCount;
        document.getElementById('rollsLeft').innerText = `Rolls left: ${rollsLeft}`;

        if (rollCount === maxRolls) {
            document.getElementById('rollButton').disabled = true; 
            document.getElementById('rollsLeft').innerText = 'No rolls left!';
        }

        
        calculateUpperSection();
        calculateThreeOfAKind();
        calculateFourOfAKind();
        calculateFullHouse();
        calculateSmallStraight();
        calculateLargeStraight();
        calculateChance();
        calculateYahtzee();
        calculateTotalSum();
    }
};
