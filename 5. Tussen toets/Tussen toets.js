var person = {
    name: "john",
    age: 25,
    greet: function(){
        console.log("Hello, " + this.name + "!");
    }
}

///////////

let naam = "The Weeknd";
let reversedName = naam.split(" ").reverse().join(":");
console.log(reversedName);

/////////////

const a = 5;
const b = "15";
console.log(a * 3 == b, a * 3 === b);

////////////

let numberOne = 5;
let numberTwo = 15;
const result = numberOne === numberTwo;

console.log(result);

///////////////

const xx = 5;
const yy = "5";
const zz = 12;

console.log(x + y + z);

/////////////

const x = 5;
const y = "5";
const z = 12;

console.log(string(x) + String(Number(y)) + z);