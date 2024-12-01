let dino = document.getElementById('dino');
let obstacle = document.getElementById('obstacle');
let gameContainer = document.getElementById('gameContainer');
let ground = document.getElementById('ground');
let startScreen = document.getElementById('startScreen');
let gameOverScreen = document.getElementById('gameOverScreen');
let startButton = document.getElementById('startButton');
let playAgainButton = document.getElementById('playAgainButton');
let scoreDisplay = document.getElementById('scoreDisplay');
let highScoreDisplay = document.getElementById('highScoreDisplay');
let scoreGameOverDisplay = document.getElementById('scoreGameOverDisplay');

let dinoPosition = 0;
let isJumping = false;
let jumpHeight = 0;
let obstaclePosition = 480;
let obstacleSpeed = 10;
let gameInterval;
let isGameOver = false;
let score = 0; // Current score
let highScore = localStorage.getItem('highScore') || 0; // Get the high score from localStorage
highScoreDisplay.textContent = `High Score: ${highScore}`

// Jumping logic
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' && !isJumping && !isGameOver) {
        isJumping = true;
        jumpHeight = 0;
        let jumpInterval = setInterval(function() {
            if (jumpHeight < 100) {
                jumpHeight += 5;
                dinoPosition = jumpHeight;
                dino.style.bottom = `${dinoPosition}px`;
            } else {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(function() {
                    if (jumpHeight > 0) {
                        jumpHeight -= 5;
                        dinoPosition = jumpHeight;
                        dino.style.bottom = `${dinoPosition + 20}px`;
                    } else {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                }, 20);
            }
        }, 20);
    }
});

// Start the game when the start button is clicked
startButton.addEventListener('click', startGame);

// Restart the game when the play again button is clicked
playAgainButton.addEventListener('click', restartGame);

function startGame() {
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    isGameOver = false;
    obstaclePosition = gameContainer.clientWidth < 480 ? 480 : gameContainer.clientWidth;
    obstacleSpeed = 10;
    gameInterval = setInterval(moveObstacle, 20);
}

// Move the obstacle
function moveObstacle() {
    if (isGameOver) return;

    obstaclePosition -= obstacleSpeed;
    obstacle.style.left = `${obstaclePosition}px`;

    if (obstaclePosition < -30) {
        obstaclePosition = gameContainer.clientWidth < 480 ? 480 : gameContainer.clientWidth;
        score++; // Increase score when an obstacle passes
        scoreDisplay.textContent = `Punkte: ${score}`;
        obstacleSpeed += 0.1;
    }

    // Collision detection
    if (obstaclePosition < 40 && obstaclePosition > 0 && dinoPosition < 40) {
        endGame();
    }
}

// End the game when a collision is detected
function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    gameOverScreen.style.display = 'block';
    gameContainer.style.display = 'none';
    scoreGameOverDisplay.textContent = `Punkte: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Save high score in localStorage
        highScoreDisplay.textContent = `Highscore: ${highScore}`;

    }
    
    score = 0;
    scoreDisplay.textContent = `Punkte: 0`;
}

// Restart the game
function restartGame() {
    dinoPosition = 0;
    isJumping = false;
    jumpHeight = 0;
    obstaclePosition = 480;
    obstacleSpeed = 10;
    gameOverScreen.style.display = 'none';
    startGame();
}
