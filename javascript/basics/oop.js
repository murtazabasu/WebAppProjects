let baseSalary = 30_000;
let overtime = 10;
let rate = 20;

// procedural programming
function getWage(baseSalary, overtime, rate){
    return baseSalary + (overtime * rate);
}

// oop - encapsulation - group related fns and props together
let employee = {
    baseSalary: 30_000,
    overtime: 10,
    rate: 20,
    getWage: function(){
        return this.baseSalary + (this.overtime * this.rate)
    }
};
let wage = employee.getWage();
console.log(wage);

//oop - abstraction - hide details, complexity + isolate impace of changes

//oop - inheritance - eliminate redundant code

//oop - polymorphism - same base method with changes