function rollDice() {
    const diceImagesDiv = document.getElementById('diceImages');
    const diceArray = [];
    diceImagesDiv.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const diceValue = Math.floor(Math.random() * 6) + 1; 
        diceArray.push(diceValue); 

        const img = document.createElement('img'); 
        img.src = `images/${diceValue}.png`;  
        diceImagesDiv.appendChild(img); 
    }

    displayCountResults(diceArray);
}

function countNumber(array, number) {
    return array.filter(value => value === number).length; 
}

function displayCountResults(diceArray) {
    const countResultsDiv = document.getElementById('countResults');
    countResultsDiv.innerHTML = ''; 

    for (let i = 1; i <= 6; i++) {
        const count = countNumber(diceArray, i);
        countResultsDiv.innerHTML += `Aantal ${i}: ${count}<br>`;
    }
}

document.getElementById('rollButton').addEventListener('click', rollDice);
