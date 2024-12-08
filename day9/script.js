// script.js

// Example starting data
const startDate = new Date('2024-05-18'); // Change to your relationship start date
const data = {
    dates: 9999999999,
    laughingHours: 999999999999999,
    hugsGiven: 999999999999999999999999,
    insideJokes: 999999999999999999999999999,
    liebedichGesagt: 999999999999999999999999999999999999
};

// Calculate the number of days together
function calculateDaysTogether(startDate) {
    const now = new Date();
    const difference = now - startDate;
    return Math.floor(difference / (1000 * 60 * 60 * 24));
}

// Update stats dynamically
function updateDashboard() {
    document.getElementById('daysTogether').textContent = calculateDaysTogether(startDate);
    document.getElementById('dates').textContent = data.dates;
    document.getElementById('laughingHours').textContent = data.laughingHours;
    document.getElementById('hugsGiven').textContent = data.hugsGiven;
    document.getElementById('insideJokes').textContent = data.insideJokes;
    document.getElementById('liebedichGesagt').textContent = data.liebedichGesagt;
}

// Initialize dashboard
updateDashboard();
