const emojiDetails = [
  { description: "Face with tears of joy", emoji: "😂" },
  { description: "Winking face", emoji: "😉" },
  { description: "Thumbs up", emoji: "👍" },
  { description: "Heart eyes", emoji: "😍" },
  { description: "Crying face", emoji: "😢" },
  { description: "Fire", emoji: "🔥" },
  { description: "Red heart", emoji: "❤️" },
  { description: "Clapping hands", emoji: "👏" },
  { description: "Alien", emoji: "👽" },
  { description: "Robot", emoji: "🤖" },
];

let currentEmojiIndex = 0;
let score = 0;
let second = 60;
let timer;
//

//
const reminderElement = document.getElementById("reminder");
const timerElement = document.getElementById("timer");
const guessInput = document.getElementById("guess-input");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const correctSound = new Audio("audio/correct-156911.mp3"); // Path to your correct answer sound
const wrongSound = new Audio("audio/wrong-answer-21-199825.mp3"); // Path to your wrong answer sound
// const clockTicking = new Audio("audio/clock-ticking.mp3");

function displayEmoji() {
  const descriptionElement = document.getElementById("description");
  descriptionElement.textContent = emojiDetails[currentEmojiIndex].emoji;
  timerElement.textContent = `Time-left: ${second}s`;
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  const correctEmoji = emojiDetails[currentEmojiIndex].description
    .trim()
    .toLowerCase();

  if (guess === correctEmoji) {
    correctSound.play();
    resultElement.textContent = "🎉 Correct!";
    score++;
  } else {
    wrongSound.play();
    resultElement.textContent = "❌ Wrong!";
  }
  console.log(score);
  scoreElement.textContent = `Score: ${score}/10`;
  guessInput.value = "";
  guessInput.focus();
  nextEmoji();
}

function nextEmoji() {
  currentEmojiIndex++;
  setTimeout(() => {
    resultElement.textContent = "";
  }, 1000);

  if (currentEmojiIndex === emojiDetails.length) {
    currentEmojiIndex = 0;
    score = 0;
  }

  displayEmoji();
}

document.getElementById("guess-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayEmoji();
  startTimer();
});

//timer
function startTimer() {
  timer = setInterval(() => {
    second--;

    timerElement.textContent = `Time-left: ${second}s`;
    remindUser();
    if (second <= 0) {
      endGame();
    }
  }, 1000);
}

function remindUser() {
  if (second == 30) {
    reminderElement.textContent = "Hurry Up Only 30s left";
    setTimeout(() => {
      reminderElement.textContent = "";
    }, 2000);
  }
}

function endGame() {
  clearInterval(timer);
  guessInput.disabled = true;
  timerElement.textContent = "";
}
