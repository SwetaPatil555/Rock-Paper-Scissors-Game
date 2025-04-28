setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "paper" },
  { name: "rock", beats: "scissors" },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");
const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const playAgainBtn = document.querySelector(".play-again");
const nextBtn = document.querySelector(".next-btn"); 

// Scores
const scoreNumber = document.querySelector(".your__score__number");
const computerScoreNumber = document.querySelector(".computer__score__number");
let score = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

// Initial display
scoreNumber.innerText = score;
computerScoreNumber.innerText = computerScore;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((c) => c.name === choiceName);
    playRound(choice);
  });
});

function playRound(playerChoice) {
  const computerChoice = aiChoose();
  displayResults([playerChoice, computerChoice]);
  displayWinner(playerChoice, computerChoice);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * 3);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      const choiceName = results[idx].name;
      resultDiv.innerHTML = `
        <div class="choice ${choiceName}">
          <img src="${choiceName}.png" alt="${choiceName}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(playerChoice, computerChoice) {
  setTimeout(() => {
    let winner = "";
    nextBtn.classList.add("hidden"); 

    if (playerChoice.beats === computerChoice.name) {
      winner = "user";
      resultText.innerText = "You Win! Against PC!";
      resultDivs[0].classList.add("winner");
      updateScore(winner);
      nextBtn.classList.remove("hidden"); 
    } else if (computerChoice.beats === playerChoice.name) {
      winner = "computer";
      resultText.innerText = "You Lose! Against PC!";
      resultDivs[1].classList.add("winner");
      updateScore(winner);
    } else {
      winner = "draw";
      resultText.innerText = "TIE UP!";
    }

    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function updateScore(winner) {
  if (winner === "user") {
    score++;
    scoreNumber.innerText = score;
    localStorage.setItem('playerScore', score);
  } else if (winner === "computer") {
    computerScore++;
    computerScoreNumber.innerText = computerScore;
    localStorage.setItem('computerScore', computerScore);
  }
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
  nextBtn.classList.add("hidden"); 
});

// Next button action
nextBtn.addEventListener("click", () => {
  window.location.href = "winpage.html";
});

// Rules modal
const rulesBox = document.querySelector('.rulesContainer');
const cancelBtn = document.querySelector('.cancel');

btnRules.addEventListener('click', () => {
  rulesBox.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
  rulesBox.style.display = 'none';
});
