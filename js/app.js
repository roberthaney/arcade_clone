// Set global variables for score, sounds 
var score = 0;
//sounds created at http://www.bfxr.net/
var gemsnd = new Audio("Pickup_Gem.wav");
var diesnd = new Audio("die.wav");
var watersnd = new Audio("reachwater.wav");

// Enemies player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to  instances
    this.sprite = 'images/enemy-bug-small.png';
    this.x = x;
	this.y = y;
	this.speed = speed;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
// which will ensure the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    this.x = (this.x + this.speed*dt) % 610;
    //collision detection
    if (this.x  < player.x + 56 && this.x + 86 > player.x && this.y < player.y + 73 && this.y + 55 > player.y) {
        diesnd.play();
        score -= 1;
        player.y = player.y + (550 - player.y);
        player.lives -= 1;
    }
};

// Draw the enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x,y) {
    this.sprite = 'images/char-boy-small.png';
    this.x = x;
    this.y = y;
    this.lives = 3;
};

// Update player values
Player.prototype.update = function(dt) {
    if (this.y <= 50) {
        //call helper function when water is reached
        reachWaterAnimate();
        score += 10;
        this.y = this.y + 500;
    }
};

// Input handler for key presses controlling player movement
Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y > 0) {
    this.y = this.y - 20;
    }
    if (key === 'down' && this.y < 560) {
    this.y = this.y + 20;
    }
    if (key === 'left' && this.x > 10) {
    this.x = this.x - 20;
    }
    if (key === 'right' && this.x < 620) {
    this.x = this.x + 20;
    }
};

// Draw player
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Gem class
var Gem = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = ['images/Gem-Orange-small.png', 'images/Gem-Blue-small.png', 'images/Gem-Green-small.png'][getRandomInt(0,2)];
};

// Draw gem
Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Gem update, check for player collision with gem objects, increment score and make new gem
Gem.prototype.update = function() {
    //collision detection
    if (player.x  < this.x + 30 && player.x + 51 > this.x && player.y < this.y + 32 && player.y + 63 > this.y) {
       gemsnd.play();
       score += 1;
       this.x = 1000;
       this.y = 1000;
       gems.push(new Gem(getRandomInt(0,550),getRandomInt(350,500)));
    }
};

// Scoreboard class
var Scoreboard = function (x,y) {
    this.x = x;
    this.y = y;
}

// Draw scoreboard
Scoreboard.prototype.render = function() {
    ctx.clearRect(0,670, 707,80);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(0,670, 707, 80);
    ctx.fillStyle = "red";
    ctx.fillRect(2,672, 290, 78);
    ctx.font = "18px Papyrus";
    ctx.fillStyle = "white";
    ctx.fillText("Beware the", 75, 690);
    ctx.font = "40px Papyrus";
    ctx.fillText("Beetle Brigade!", 5, 735);
    ctx.font = "36px Papyrus";
    ctx.fillText("Score: " + score, 500, 740);
    ctx.fillText("Lives: " + player.lives, 500, 705)
}

// Star class
var Star = function(x,y) {
    this.sprite = 'images/star.png';
    this.x = x;
    this.y = y;
}

// Draw star
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// From MDN, helper function to generate random integer between two bounds including upper bound
function getRandomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1)) + low;	
}

// Helper function for basic animation on reaching water
function reachWaterAnimate() {
	stars.forEach(function(star) {
	    star.y = 0;
	});
	setTimeout(function() {
	stars.forEach(function(star) {
	    star.y = 1000;
	})
	}, 500);
    watersnd.play();
}
        
// Instantiate  objects.
var allEnemies = [];
var gems = [];
var enemy1 = new Enemy(0,140,getRandomInt(50,150));
allEnemies.push(enemy1);
var enemy2 = new Enemy(0,220,getRandomInt(50,150));
allEnemies.push(enemy2);
var enemy3 = new Enemy(0,310,getRandomInt(50,150));
allEnemies.push(enemy3);
var enemy4 = new Enemy(0,220,250);
allEnemies.push(enemy4);
var player = new Player(320,550);
var gem = new Gem(getRandomInt(0,550),getRandomInt(350,500));
gems.push(gem);
var scoreBoard = new Scoreboard(5, 700);
var stars = [];
for (var i = 0; i < 13; i++) {
	stars.push(new Star(i*50,1000));
}

// Event listener for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


