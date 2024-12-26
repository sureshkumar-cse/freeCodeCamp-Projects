// What Is the Arrow Function Syntax?

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

// <==============================================================================================================>

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

// <==============================================================================================================>

// Why Arrow Functions Are Recommended Over Regular Functions


// Arrow Functions Are Better for Short Functions
  
  // Regular Function
  function greetings(name) {
    console.log(`Hello, ${name}!`);
  }

  // Arrow Function
  const greetings = name => console.log(`Hello, ${name}!`);

  // If the function has no parameter, then only need to pass empty parentheses between the assignment and the arrow syntax as shown below:
  const greetings = () => console.log(`Hello, World!`);

  // Arrow functions are also great for situations where no need to name the function, such as callbacks:
  const myArray = [1, 2, 3, 4, 5];

  // From this:
  myArray.forEach(function (item) {
    console.log(item);
  });

  // To this:
  myArray.forEach(item => console.log(item));

  // Or when need to create an Immediately Invoked Function Expression (IIFE):
  // From this:
  (function () {
    console.log('Hello World');
  })();
  
  // To this:
  (() => console.log('Hello World'))();

  // As you can see, using the arrow function syntax makes your code much more clean and concise.

