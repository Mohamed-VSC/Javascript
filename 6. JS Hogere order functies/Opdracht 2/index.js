//Arrow function
const kwadraat = (x) => x * x;


//traditionele functie
function kwadraat(x) {
    return x * x;
}
console.log(kwadraat(2, 3));


//functie expressie
const kwadraat = function(x){
    return x * x;
}

console.log(kwadraat(2, 3));
console.log(typeof kwadraat);
