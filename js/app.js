const level = document.querySelector(".Level_number");
//////////////////////////////////////////////////////////

// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.sprite ='images/enemy-bug.png';

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;
   //occurs when the enemy position is at the same time between the player 
      if(this.x  > player.x &&
       this.x  < player.x + 93 &&
       this.y  > player.y && 
       this.y  < player.y + 93 )
     {

      //reset position & level  
        player.x=303;
        player.y=500;
        player.level=1;
       level.innerHTML= player.level ;
    }

    
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)+1) + min; //The maximum is inclusive and the minimum is inclusive 
};


let allEnemies =[];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
(function createEnemy() {
    let row   = (getRandom(1,4)*84)-18;
    let speed = getRandom(100,550);
    let enemy = allEnemies.push(new Enemy(1,row  , speed));
    // Create multiple enemies with time delay between instances
    setTimeout(createEnemy, 1000);
})();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x,y){
     
     this.x = x;
     this.y = y;
     this.level=1;
     this.sprite='images/char-boy.png';
     
};


Player.prototype.update = function(){
      
    //reach thw water ...
    if(this.y === 35 ){
        //increment level & start origan place..
        this.level ++;
        level.innerHTML = this.level; 
        player.x=303;
        player.y=500;

   }
 };


Player.prototype.render=function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
 };

 

Player.prototype.handleInput=function(keypress){
    switch(keypress){
        case 'up':
         if(this.y>0){
           this.y=this.y - 93;
         } 
        break;

        case 'down':
        if(this.y<450){
          this.y=this.y + 93;
        } 
        break;

        case 'left':
        if(this.x>0){
           this.x=this.x - 101;
        }
        break;

        case 'right':
        if(this.x<606){
          this.x=this.x + 101;
        }
        break;
    }

 };


// Place the player object in a variable called player
let player = new Player(303,500);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
