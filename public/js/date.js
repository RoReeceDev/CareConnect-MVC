// Get the current date in the format YYYY-MM-DD
const currentDate = new Date().toISOString().split('T')[0];

// Set the minimum value for the date input to the current date
document.getElementById('eventDate').min = currentDate;
