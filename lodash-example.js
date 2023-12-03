const { isEqual } = require("lodash");

const object1 = { name: "Sanjay", age: 29, role: "Software Engineer" };
const object2 = { name: "Sanjay", role: "Software Engineer", age: 29 };

console.log(object1 === object2);
// Stringified
console.log(JSON.stringify(object1) === JSON.stringify(object2));

console.log(isEqual(object1, object2));
