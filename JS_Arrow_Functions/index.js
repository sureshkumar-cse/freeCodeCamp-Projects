// Regular Function in JS
function greetings(name) {
  console.log(`Hello, ${name}!`);
}

greetings("Madhura");

// Arrow Function in JS:
const greetings = (name) => {
  console.log(`Hello, ${name}!`);
};

greetings("Madhura");


// How to Convert a Regular Function to an Arrow Function Easily
function greetings(name) {
  return `Hello, ${name}!`;
}

// Step 1: replace function with const
const greetings(name) {
  return `Hello, ${name}!`;
}

// Step 2: add = after the function name
const greetings = (name) {
  return `Hello, ${name}!`;
}

// Step 3: add => after the parentheses
const greetings = (name) => {
  return `Hello, ${name}!`;
}

// With a single line function, we can remove the curly brackets and the return keyword as follows:
const greetings = (name) => `Hello, ${name}!`;

// With exactly one parameter, we can also remove the parentheses:
const greetings = name => `Hello, ${name}!`;

