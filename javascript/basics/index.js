console.log('Hello World');

// value types
let name = "string"; //string
console.log(typeof(name));
let age = 30;
let flag = true;
let fname = null;
let lname = undefined;


// dynamic typing example
// name is declared above
name = "x";
name = "y";
name = 10;
console.log(name);

//reference types
//1.object
let person = {
    prop1: 'Mosh',
    prop2:30
};

console.log(person);

person.prop1 = 'john'

console.log(person);
console.log(person.prop1);
console.log(person['prop1']);

// array
let colors = ['red', 'blue'];
colors[2] = 'green';
console.log(colors);
colors.push(1);
console.log(colors);

//function

function greet(name) {
    console.log(name + ' World!');
}
greet("Hallo");