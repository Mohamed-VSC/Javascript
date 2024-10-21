let diceValues = [1, 2, 3, 4, 5];
let heldDice = [false, false, false, false, false];
let rollsLeft = 3;
let scorePlaced = false;

// Selecteer de DOM-elementen
const diceElements = document.querySelectorAll('.dices');
const rollDiceButton = document.getElementById('rollDiceButton');
const rollsLeftDisplay = document.getElementById('rollsLeft');
const scoreboard = document.querySelectorAll('td[data-category]');
const upperTotalDisplay = document.getElementById('upperTotal');
const lowerTotalDisplay = document.getElementById('lowerTotal');
const grandTotalDisplay = document.getElementById('grandTotal');


function rollDice() {
  if (rollsLeft > 0 && !scorePlaced) {
    for (let i = 0; i < diceValues.length; i++) {
      if (!heldDice[i]) {
        diceValues[i] = Math.floor(Math.random() * 6) + 1; 
      }
      diceElements[i].querySelector('img').src = `images/${diceValues[i]}.png`; // Update dice images
    }
    rollsLeft--; 
    rollsLeftDisplay.textContent = `Rolls Left: ${rollsLeft}`; // Update rolls left display
  } else if (scorePlaced) {
    alert('Plaats je score voordat je opnieuw gooit!');
  } else {
    alert('Geen worpen meer! Plaats je score.');
  }
}


function resetGame() {
  diceValues = [1, 2, 3, 4, 5];  
  heldDice = [false, false, false, false, false];  
  rollsLeft = 3;  
  rollsLeftDisplay.textContent = `Rolls Left: ${rollsLeft}`;  // Update rolls left display

  diceElements.forEach((dices, index) => {
    dices.querySelector('img').src = `images/${diceValues[index]}.png`;  // Reset dice images
    dices.style.backgroundColor = 'white';  // Reset background color
  });

  scorePlaced = false; 
}


function toggleHoldDice(index) {
  if (rollsLeft > 0) {
    heldDice[index] = !heldDice[index]; 
    diceElements[index].style.backgroundColor = heldDice[index] ? '#cccccc' : 'white'; 
  }
}


function placeScore(category) {
  if (scorePlaced) return; // Stop if a score is already placed

  const score = calculateScore(category);
  const cell = document.querySelector(`td[data-category="${category}"]`);

  if (cell && cell.textContent === '') {
    cell.textContent = score;  
    scorePlaced = true;  
    updateTotalScores(); 
  } else {
    alert('Je hebt al een score geplaatst in deze categorie.');
  }
}


function calculateScore(category) {
  let score = 0;
  switch (category) {
    case 'ones':
      score = diceValues.filter(dice => dice === 1).length; 
      break;
    case 'twos':
      score = diceValues.filter(dice => dice === 2).length * 2;
      break;
    case 'threes':
      score = diceValues.filter(dice => dice === 3).length * 3;
      break;
    case 'fours':
      score = diceValues.filter(dice => dice === 4).length * 4;
      break;
    case 'fives':
      score = diceValues.filter(dice => dice === 5).length * 5;
      break;
    case 'sixes':
      score = diceValues.filter(dice => dice === 6).length * 6;
      break;
    case 'chance':
      score = diceValues.reduce((acc, val) => acc + val, 0); 
      break;
    case 'smallStraight':
      score = hasSmallStraight() ? 30 : 0; 
      break;
    case 'largeStraight':
      score = hasLargeStraight() ? 40 : 0; 
      break;
    case 'threeOfAKind':
      score = hasOfAKind(3) ? diceValues.reduce((acc, val) => acc + val, 0) : 0;
      break;
    case 'fourOfAKind':
     score = hasOfAKind(4) ? diceValues.reduce((acc, val) => acc + val, 0) : 0;
     break;
  }
  return score;
}

function hasOfAKind(n) {
  const counts = {};
  for (const value of diceValues) {
    counts[value] = (counts[value] || 0) + 1;
  }
  return Object.values(counts).some(count => count >= n);
}

function hasSmallStraight() {
  const uniqueValues = [...new Set(diceValues)].sort((a, b) => a - b);
  const straightPatterns = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6]
  ];

  return straightPatterns.some(pattern => pattern.every(num => uniqueValues.includes(num)));
}
    

function hasLargeStraight() {
  const uniqueValues = [...new Set(diceValues)].sort((a, b) => a - b);
  const straightPatterns = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6]
  ];

  return straightPatterns.some(pattern => pattern.every(num => uniqueValues.includes(num)));
}
 

function updateTotalScores() {
  const upperTotal = Array.from(scoreboard).slice(0, 6).reduce((acc, cell) => acc + parseInt(cell.textContent || 0), 0);
  const lowerTotal = Array.from(scoreboard).slice(6).reduce((acc, cell) => acc + parseInt(cell.textContent || 0), 0);
  
  upperTotalDisplay.textContent = upperTotal;
  lowerTotalDisplay.textContent = lowerTotal;
  grandTotalDisplay.textContent = upperTotal + lowerTotal;
}


rollDiceButton.addEventListener('click', rollDice);
diceElements.forEach((dices, index) => {
  dices.addEventListener('click', () => toggleHoldDice(index));
});
scoreboard.forEach(cell => {
  cell.addEventListener('click', () => {
    placeScore(cell.getAttribute('data-category'));
    resetGame(); 
  });
});
