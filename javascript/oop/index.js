const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function(){
        console.log('draw')
    }
};

//circle.draw();

// use factory function two define a 
// circle obj logic that needs to be reused at many places
function createCircle(radius){
    return {
        radius, // if the key and value are same i.e. radius: radius -> radius,
        draw: function(){
            console.log('draw')
        }
    };
}

//const circle2 = createCircle(1);
// console.log(circle2.radius);
//circle2.draw();

//Constructor function -> starts with caps - no classes in js here 
// like in other programming langs

function Circle(radius){
    //console.log('this', this)
    this.radius = radius;
    this.draw = function() {
        console.log('draw');
    }
}
//const circle3 = Circle(3); // creates a window (global) obj - BAD practice!
const circle3 = new Circle(3); // creates a instance

// line 40: call is exactly same to the below
Circle.call({}, 1)
Circle.apply({}, [1,1,2])

//Primitives and reference
let x = 10;
let y = x;

x = 20;
//y = 10

//references

let x1 = {value: 10};
let y1 = x1

x1.value = 20;

//y1 = 20

//takeaway: primitives are copied by value, objs are copied by ref

function Circle4(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    }
}

const circle4 = new Circle4(43);

for (let key in circle4) {
    if (typeof(key) !== "function") {
        console.log(key, circle[key]);
    }
}

const keys = Object.keys(circle4);
console.log(keys)

// abstraction
function CircleAbstraction(radius){
    this.radius = radius;
    let defaultLocation = { x: 0, y: 0 };
    
    let computeOptimumLocation = function(factor){
        //..
    }
    this.draw = function(){
        computeOptimumLocation(0.1);
        console.log('draw');
    };
}

const circleAbstraction = new CircleAbstraction(10);

// circleAbstraction.draw();
// circleAbstraction.radius;

// use getters and setters
// to read and set pvt proeprties
function CircleGetSetProp(radius){
    this.radius = radius;
    let defaultLocation = { x: 0, y: 0 };
    
    // method 1
    this.getDefaultLocation = function(){
        return defaultLocation;
    }
    this.draw = function(){
        console.log('draw');
    };
    Object.defineProperty(this, 'defaultLocation', {
        get: function(){
            return defaultLocation
        },
        set: function(value){
            if (!value.x || !value.y) {
                throw new Error("Invalid location!")
            }
            defaultLocation = value
        } 
    });
}

const circleGetSetProp = new CircleGetSetProp(10);
console.log(circleGetSetProp.defaultLocation);
circleGetSetProp.defaultLocation = { x: 1, y: 2 };
console.log(circleGetSetProp.defaultLocation);
circleGetSetProp.defaultLocation = 25;