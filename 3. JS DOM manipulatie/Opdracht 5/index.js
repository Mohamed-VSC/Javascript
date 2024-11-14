// Opdracht 4
function rollDice() {
    const diceArray = []; 

    for (let i = 0; i < 5; i++) {
        diceArray.push(Math.floor(Math.random() * 6) + 1);
    }
    displayDiceValues(diceArray);
    displayCountResults(diceArray);
}

function displayDiceValues(diceArray) {
    const diceValuesDiv = document.getElementById('diceValues');
    diceValuesDiv.innerHTML = `Dobbelstenen: ${diceArray.join(', ')}`;
}

// Opdracht 5
function countNumber(array, number) {
    let count = 0;

    for (let i = 0; i < array.length; i++) {
  
        if (array[i] === number) {
            count++; 
        }
    }

    return count; 
}

//Opdracht 6
function displayCountResults(diceArray) {
    const countResultsDiv = document.getElementById('countResults'); 
    countResultsDiv.innerHTML = ''; 

    for (let i = 1; i <= 6; i++) {
        const count = countNumber(diceArray, i);
        countResultsDiv.innerHTML += `Aantal ${i}: ${count}<br>`; 
    }
}

document.getElementById('rollButton').addEventListener('click', rollDice);
