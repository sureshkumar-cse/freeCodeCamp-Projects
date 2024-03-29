// 1. How to Capitalize Text
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const userName = "diya";
capitalize(userName);

// 2. How to Calculate Percent
const calculatePercent = (value, total) => Math.round((value / total) * 100);

const questionsCorrect = 6;
const questionTotal = 10;
calculatePercent(questionsCorrect, questionTotal);

// 3. How to Get a Random Element
const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const items = ["Nicely done!", "Good job!", "Good work!", "Correct!"];
getRandomItem(items);

// 4. How to Remove Duplicate Elements
const removeDuplicates = (arr) => [...new Set(arr)];

const friendList = ["Sam", "Sona", "Diya", "Sona"];
removeDuplicates(friendList);

// 5. How to Sort Elements By Certain Property
const sortBy = (arr, key) =>
  arr.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));

const lessons = [
  { position: 1, name: "Sona" },
  { position: 0, name: "Diya" },
  { position: 0, name: "Sam" },
];
sortBy(lessons, "position");

// 6. How to Check if Arrays/Objects are Equal
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

isEqual([6, "9"], [6, 9]);
isEqual([6, 9], [6, 9]);

// 7. How to Count Number of Occurrences
const countOccurrences = (arr, value) =>
  arr.reduce((a, v) => (v === value ? a + 1 : a), 0);

const pollResponses = ["Yes", "Yes", "Yes", "No"];
const response = "Yes";
countOccurrences(pollResponses, response);

// 8. How to Wait for a Certain Amount of Time
const wait = async (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

wait(3000).then(() => goToSignupPage());
wait(9000).then(() => console.log("I'm done."));

// 9. How to Use the Pluck Property from Array of Objects
const pluck = (objs, key) => objs.map((obj) => obj[key]);

const users = [
  { name: "Diya", age: 25 },
  { name: "Sam", age: 21 },
];
pluck(users, "name");

// 10. How to Insert an Element at a Certain Position
const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

const items = [1, 2, 4, 5];
// Insert the number 3 at index 2:
insert(items, 2, 3);
