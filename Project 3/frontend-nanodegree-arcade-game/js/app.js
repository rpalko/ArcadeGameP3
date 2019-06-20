// Enemies our player must avoid
const Enemy = function(x, y, s) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y + 73;
    this.speed = s;
    this.xStep = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multipling any movement by the dt parameter
    // ensures the game runs at the same speed for
    // all computers.
    if (this.x < this.xStep * 5) {
      this.x += this.speed * dt;
    } else {
      this.x = 0 - this.xStep;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player object
class Player {
  constructor () {
    this.xStep = 101;
    this.yStep = 83;
    this.xStart = this.xStep * 2;
    this.yStart = (this.yStep * 4) + 73;
    this.x = this.xStart;
    this.y = this.yStart;
    this.sprite = 'images/char-boy.png';
  }
  // Renders the player on the gameboard
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Sets boundries for key inputs on the canvas
  handleInput(input) {
    switch (input) {
      case 'left':
      console.log(this.y);
          if (this.x > 0) {
            this.x -= 101;
          }
          break;
      case 'right':
      console.log(this.y);

          if (this.x < 404) {
            this.x += 101;
          }
          break;
      case 'up':
      console.log(this.y);

          if (this.y > 0) {
            this.y -= 83;
          }
          break;
      case 'down':
      console.log(this.y);

          if (this.y < 332 ) {
            this.y += 83;
          }
          break;
    }
  }
  // Update the Player's position.
  update() {
    for(let enemy of allEnemies){
      if(enemy.y===this.y && (enemy.x + enemy.xStep > this.x && enemy.x < this.x + this.xStep) ) {
        this.x=this.xStart;
        this.y=this.yStart;
        removeHeart();
        heartsLeft -= 1;
        console.log(heartsArray);
      }
      if(this.y === -10) {
        this.x=this.xStart;
        this.y=this.yStart;
        openGameOverModal();
        stopTimer();
      }
      //if(heartsLeft === 0) {
      //openGameOverModal();
      //stopTimer();
      //}
    }
  }
}

// Instantiating objects and Global Variables
const player = new Player();
const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 83, 300);
const enemy3 = new Enemy(-101, 166, 25);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);
let timerStatus = "off";
let seconds = 0;
let minutes = 0;
let interval = null;
const hearts = document.querySelectorAll('.hearts');
let heartsLeft = 5;
let heartsArray = document.querySelectorAll('.hearts li');



// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// This function is the timer for the game.
function timer () {
    seconds++;
    if (seconds/60 ===1) {
      seconds = 0;
      minutes++;

      if (minutes/60 === 1){
        minutes = 0;
      }
    }
    if (seconds < 10) {
      stringSeconds = "0" + seconds.toString();
    } else {
      stringSeconds = seconds;
    }
    if (minutes < 10) {
      stringMinutes = "0" + minutes.toString();
    } else {
      stringMinutes = minutes;
    }
  document.getElementById('timer').innerHTML = stringMinutes + ":" + stringSeconds;
}

// This function starts the timer.
function startTimer() {
    if(timerStatus === "off") {
        interval = window.setInterval(timer, 1000);
    }
}

// This function stops the timer.
function stopTimer() {
     window.clearInterval(interval);
     timerStatus = "off";
 }

// This function restarts the timer.
function restartTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    document.getElementById('timer').innerHTML="00:00";
}



function removeHeart () {
  for (let heart of heartsArray) {
    if (heart.className !== 'hide-heart') {
        heart.classList.add('hide-heart');
      break;
    }
  }
}


// This opens the modal when the player reaches the other side.
function openGameOverModal () {
  const modal = document.querySelector('.modal-gameover');
  modal.style.visibility = 'visible';
  addModalStats();
}

// This add the players stats to the modal.
function addModalStats() {
  let timeStats = document.querySelector('.modal-time');
  let time = document.querySelector('.timer').innerHTML;
  timeStats.innerHTML = `Time: ${time}`;
}
