const users = [{ username: "somen", password: "smruti", score: 0 }];
let attempts = 3;
let currentRiddleIndex = 0;
let score = 0;
const riddles = [
    { question: "What has to be broken before you can use it?", answer: "Egg" },
    { question: "I'm tall when I'm young, and I'm short when I'm old. What am I?", answer: "Candle" },
    { question: "What has hands but can't clap?", answer: "Clock" }
];

// Login function
document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem("currentUser", username);
        localStorage.setItem("userScore", "0");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");
    }
});

// Load Riddle
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("home.html")) {
        loadRiddle();
    }
});

function loadRiddle() {
    if (currentRiddleIndex >= riddles.length) {
        document.querySelector(".game-container").innerHTML =
            `<h2>Game Over!</h2><button onclick="showLeaderboard()">View Leaderboard</button>`;
        return;
    }
    const riddle = riddles[currentRiddleIndex];
    document.querySelector(".riddle-box").innerText = riddle.question;
    
    let incorrectOptions = riddles
        .filter(r => r.answer !== riddle.answer)
        .map(r => r.answer);
    let options = shuffle(incorrectOptions).slice(0, 3);
    options.push(riddle.answer);
    options = shuffle(options);
    
    document.querySelectorAll(".option-btn").forEach((btn, index) => {
        btn.innerText = options[index];
        btn.onclick = function() { checkAnswer(options[index]); };
    });
}

function checkAnswer(selected) {
    const correctAnswer = riddles[currentRiddleIndex].answer;
    if (selected === correctAnswer) {
        score += 10;
    } else {
        attempts--;
    }
    document.querySelector(".score-box").innerText = `Score: ${score}`;
    document.querySelector(".attempts-box").innerText = `Attempts: ${attempts}`;
    localStorage.setItem("userScore", score);
    if (attempts > 0) {
        currentRiddleIndex++;
        loadRiddle();
    } else {
        document.querySelector(".game-container").innerHTML =
            `<h2>Game Over!</h2><button onclick="showLeaderboard()">View Leaderboard</button>`;
    }
}

function showLeaderboard() {
    localStorage.setItem("finalScore", score);
    window.location.href = "leaderboard.html";
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Leaderboard Page
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("leaderboard.html")) {
        const leaderboard = document.getElementById("leaderboard");
        const currentUser = localStorage.getItem("currentUser") || "Unknown User";
        const finalScore = localStorage.getItem("finalScore") || 0;
        leaderboard.innerHTML = `<h2>Leaderboard</h2><p><strong>${currentUser}</strong>: ${finalScore} points</p>`;
    }
});