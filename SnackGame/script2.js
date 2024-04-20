//  created by vishal mehra
var dotSize = 20;
var gameBoardSize = 400;
var direction = 'right';
var snake = [{ top: 0, left: 0 }];
var food = null;
var score = 0;
var highScore = 0;
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' , 'purple', 'pink',];

function updateGame() {
  var head = Object.assign({}, snake[0]); // copy head
  switch(direction) {
    case 'up': head.top -= dotSize; break;
    case 'down': head.top += dotSize; break;
    case 'left': head.left -= dotSize; break;
    case 'right': head.left += dotSize; break;
  }

  if (food && food.top === head.top && food.left === head.left) {
    food = null;
    score++;
    if (score > highScore) {
      highScore = score;
      document.getElementById('high-score').innerText = 'High Score: ' + highScore;
    }
    document.getElementById('score').innerText = 'Score: ' + score;
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // Game over conditions
  if (head.left < 0 || head.top < 0 || head.left === gameBoardSize || head.top === gameBoardSize || intersects(head, snake.slice(1))) {
    return gameOver();
  }

  if (!food) {
    food = makeFood();
  }

  drawGame();
}

function drawGame() {
  var gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  snake.forEach(function(dot, index) {
    drawDot(dot.top, dot.left, index === 0 ? 'snake-head' : '', colors[index % colors.length]);
  });
  drawDot(food.top, food.left, 'food');
}

function drawDot(top, left, id, color) {
  var gameBoard = document.getElementById('game-board');
  var dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.top = `${top}px`;
  dot.style.left = `${left}px`;
  dot.id = id;
  dot.style.background = color;
  gameBoard.appendChild(dot);
}

function makeFood() {
  return {
    top: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize,
    left: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize,
  };
}

function intersects(dot1, dots) {
  return dots.some(function(dot2) { return dot1.top === dot2.top && dot1.left === dot2.left; });
}

function gameOver() {
  clearInterval(intervalId);
  alert('Game over!');
  score = 0;
  document.getElementById('score').innerText = 'Score: ' + score;
}

function changeDirection(newDirection) {
  direction = newDirection;
}

var intervalId = setInterval(updateGame, 200);
