// Original date string
let dateString = '01-02-2024';

// Split the date string into day, month, and year
let dateArray = dateString.split('-');

// Create a new Date object with the components
let formattedDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T00:00:00.000Z`);

// Convert the Date object to a string in the desired format
let formattedDateString = formattedDate.toISOString();

console.log(formattedDateString);