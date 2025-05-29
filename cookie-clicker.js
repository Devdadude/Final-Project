const cookie = document.getElementById('cookie');
const scoreDisplay = document.getElementById('score');
const upgradeBtn = document.getElementById('upgradeBtn');

let score = 0;
let increment = 1;

cookie.addEventListener('click', () => {
  score += increment;
  scoreDisplay.textContent = score;
});

upgradeBtn.addEventListener('click', () => {
  if (score >= 10) {
    score -= 10;
    increment++;
    scoreDisplay.textContent = score;
  } else {
    alert('You need at least 10 clicks to buy an upgrade!');
  }
});
