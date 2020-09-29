// Game Variables
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for play again
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
  // reset eror message
  setMessage("", "inherit")

  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if win
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `WINNER! ${winningNum} is correct.`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}.`);
    } else {
      // Game continues - answer wrong
      // Clear input
      guessInput.value = "";

      // Change border color
      guessInput.style.borderColor = 'red';

      // Tell user their guess is wrong
      setMessage(`${guess} is not correct. ${guessesLeft} guesses remaining.`, 'red');
    }
  }
});

// Get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;

  // Change border color
  guessInput.style.borderColor = color;

  // Set message
  setMessage(msg, color);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Set Message
function setMessage(msg, color = "black") {
  message.style.color = color;
  message.textContent = msg;
}