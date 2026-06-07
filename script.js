// Select elements
const form = document.querySelector('form');
const input = document.querySelector('form input');
const resultText = document.querySelector('.result');

let liveTimer = null;        // To store the interval
let currentBirthDate = null; // Store birthdate for live updates

// Set max date to today
input.max = new Date().toISOString().split("T")[0];

// Function to display age
function displayAge(years = 0, months = 0, days = 0, seconds = 0) {
    resultText.innerHTML = `
        You are 
        <span class="year">${years}</span> years, 
        <span class="month">${months}</span> months and 
        <span class="date">${days}</span> days old.<br>
        That's approximately 
        <span class="seconds">${seconds.toLocaleString()}</span> seconds old!
    `;
}

// Start live updating
function startLiveUpdate(birthDate) {
    if (liveTimer) clearInterval(liveTimer);

    liveTimer = setInterval(() => {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += previousMonth.getDate();
            months--;
        }

        if (months < 0) {
            months += 12;
            years--;
        }

        const timeDiff = now.getTime() - birthDate.getTime();
        const totalSeconds = Math.floor(timeDiff / 1000);

        displayAge(years, months, days, totalSeconds);
    }, 1000); // Update every second
}

// Show default state
displayAge(0, 0, 0, 0);

// Form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const birthDateStr = input.value;
    
    if (!birthDateStr) {
        if (liveTimer) clearInterval(liveTimer);
        displayAge(0, 0, 0, 0);
        return;
    }

    const birthDate = new Date(birthDateStr);
    currentBirthDate = birthDate;

    // Initial calculation
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    const timeDiff = now.getTime() - birthDate.getTime();
    const totalSeconds = Math.floor(timeDiff / 1000);

    displayAge(years, months, days, totalSeconds);

    // Start live updating
    startLiveUpdate(birthDate);
});