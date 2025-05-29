const canvas = document.getElementById('pong-canvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 8;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

let ballSpeedX = 5;
let ballSpeedY = 3;

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

const paddleSpeed = 7;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fill();
}

function drawNet() {
  ctx.strokeStyle = '#ff2e2e';
  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function draw() {
  // Clear canvas
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  // Draw net
  drawNet();

  // Draw paddles
  drawRect(0, leftPaddleY, paddleWidth, paddleHeight, '#ff2e2e');
  drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, '#ff2e2e');

  // Draw ball
  drawCircle(ballX, ballY, ballRadius, '#ff2e2e');
}

function update() {
  // Move paddles
  leftPaddleY += leftPaddleSpeed;
  rightPaddleY += rightPaddleSpeed;

  // Prevent paddles from going out of bounds
  leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
  rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  } else if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds (score reset)
  if (ballX + ballRadius < 0 || ballX - ballRadius > canvas.width) {
    resetBall();
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
    case 'W':
      leftPaddleSpeed = -paddleSpeed;
      break;
    case 's':
    case 'S':
      leftPaddleSpeed = paddleSpeed;
      break;
    case 'ArrowUp':
      rightPaddleSpeed = -paddleSpeed;
      break;
    case 'ArrowDown':
      rightPaddleSpeed = paddleSpeed;
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
    case 'W':
    case 's':
    case 'S':
      leftPaddleSpeed = 0;
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      rightPaddleSpeed = 0;
      break;
  }
});

resetBall();
gameLoop();
