// =======================
// Sound effects
// =======================
const soundCorrect = new Audio("correct.mp3"); // correct click
const soundWrong = new Audio("wrong.mp3");     // wrong click
const soundWin = new Audio("win.mp3");         // win
const soundTick = new Audio("tick.mp3");       // timer tick

soundCorrect.volume = 0.5;
soundWrong.volume = 0.5;
soundWin.volume = 0.5;
soundTick.volume = 0.3;

// Flag to start tick only after first click
let tickStarted = false;

// =======================
// Game variables
// =======================
let numbers;        // array of numbers
let current;        // next number to click
let levelSize = 9;  // default level: Medium (9 numbers)
let time = 0;       // timer seconds
let timer;

const game = document.getElementById("game");
const message = document.getElementById("message");
const timeDisplay = document.getElementById("time");

// =======================
// Start / Restart game
// =======================
function startGame() {
    // Reset everything
    game.innerHTML = "";
    message.textContent = "";
    current = 1;

    // Stop previous timer
    clearInterval(timer);
    time = 0;
    timeDisplay.textContent = time;

    // Reset tick
    tickStarted = false;

    // Create numbers for current level
    numbers = Array.from({ length: levelSize }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);

    // Create clickable boxes
    numbers.forEach(num => {
        const div = document.createElement("div");
        div.className = "box";
        div.textContent = num;

        div.onclick = () => {

            // Start timer and tick on first click
            if (!tickStarted) {
                tickStarted = true;

                timer = setInterval(() => {
                    time++;
                    timeDisplay.textContent = time;

                    // Play tick sound every second
                    const tick = soundTick.cloneNode();
                    tick.play();
                }, 1000);
            }

            // Correct click
            if (num === current) {
                div.style.background = "gray";
                current++;
                soundCorrect.play();

                // Win condition
                if (current > numbers.length) {
                    message.textContent = "🎉 You Win!";
                    clearInterval(timer);
                    tickStarted = false;
                    soundWin.play();
                }

            } else {
                // Wrong click
                message.textContent = "❌ Wrong! Try Again";
                soundWrong.play();
                startGame();
                tickStarted = false;
            }
        };

        game.appendChild(div);
    });
}

// =======================
// Set game level
// =======================
function setLevel(size) {
    levelSize = size;
    startGame();
}

// =======================
// Restart button
// =======================
function restartGame() {
    startGame();
}

// =======================
// Initialize game
// =======================
startGame();
