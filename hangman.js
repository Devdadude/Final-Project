const optionsContainer = document.getElementById('options-container');
const userInputSection = document.getElementById('user-input-section');
const resultText = document.getElementById('result-text');
const newGameBtn = document.getElementById('new-game-button');

const words = ['javascript', 'programming', 'computer', 'hangman', 'game'];

let selectedWord = '';
let guesses = [];
let remainingGuesses = 6;

function setupGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guesses = Array(selectedWord.length).fill('_');
  remainingGuesses = 6;
  updateDisplay();
  resultText.textContent = '';
}

function updateDisplay() {
  userInputSection.textContent = guesses.join(' ');
}

function guessLetter(letter) {
  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) guesses[i] = letter;
    }
  } else {
    remainingGuesses--;
  }
  updateDisplay();
  checkGameStatus();
}

function checkGameStatus() {
  if (!guesses.includes('_')) {
    resultText.textContent = 'You won! 🎉';
    disableOptions();
  } else if (remainingGuesses <= 0) {
    resultText.textContent = `You lost! The word was "${selectedWord}".`;
    disableOptions();
  }
}

function disableOptions() {
  Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
}

function createLetterButtons() {
  optionsContainer.innerHTML = '';
  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('options');
    button.addEventListener('click', () => {
      guessLetter(letter);
      button.disabled = true;
    });
    optionsContainer.appendChild(button);
  }
}

newGameBtn.addEventListener('click', () => {
  createLetterButtons();
  setupGame();
});

window.onload = () => {
  createLetterButtons();
  setupGame();
};
