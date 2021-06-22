const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/*An API, that creates a context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.*/
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// load images
const images = {};
images.ghost = new Image();
images.soul = new Image();
images.ghost.src = 'smallghost.png';
images.soul.src ='PeacefulGhost.png';

//const ghostsActions = ['up','right', 'down right', 'down']
const ghostsActions = ['up','right'];
const numberofGhosts = 15;
const ghosts = [];


class Ghost {
  constructor(){
    this.height = 197; //h & w of sprite on sprite sheet
    this.width = 125;
    this.frameX = 0; //cordinates on spirte sheet so we know which image
    this.frameY =0;
    this.x =200; // coordinates for where we want the sprite on the background image
    this.y =500;//use math.random so the ghost arent on top of each other
    this.speed = 6;
    this.action = ghostsActions [Math.floor(Math.random()* ghostsActions.length)]; // randomnizes the index selction of which direction the ghost will go. Math.floor rounds down to an even number.
    if(this.action === 'up'){
         this.frameY = 2;
       
    }else {
      this.frameY =1;
      this.height = 197; //The sprite sheet is uneven so I have to change the height and width depending on which frame/direction I want
    this.width = 125;
    }
  }
  draw(){
    drawGhost(images.ghost,this.width * this.frameX,this.height *this.frameY,this.width, this.height,this.x,this.y,this.width, this.height);

    if (this.frameX < 3) {this.frameX++;
   }else{
    this.frameX = 3;
  }

  }
  move(){ 
   if(this.action === 'right'){
      
    if (this.x > canvas.width + this.width){
     this.x = 0 - this.width;
      this.y = Math.random()* (canvas.height - this.height*2);
        //randomly appears on the background. Minus the ghodt height so that it doesnt spawn off screen
    
    }
    else{
      // move ghost
      this.x += this.speed;
    }
  }else if (this.action === 'up' ){
    
    if (this.y < (0 -this.height)){
      this.y = canvas.height + this.height;
      this.x = Math.random() * canvas.width- this.height*2;
      
    }else{ //ghost has not walked off the screen yet. substracting its location by its speed it will make it go off the screen gradually.
      this.y -=this.speed;
    }
  }
}
}


// create variables to find a specific sprite in the sheet
for (i =0; i < numberofGhosts; i++){
ghosts.push(new Ghost());
}

//first four parameters are from the image source and specfiy what needs to be cropped. The second four parameters are for where the image should go on the canvas.
function drawGhost(img, sX,sY,sW,sH,dX,dY,dW,dH){
  ctx.drawImage(img, sX,sY,sW,sH,dX,dY,dW,dH);
}

 
   

function animateGhost(){
  
  ctx.clearRect(0,0,canvas.width, canvas.height);
  for (i = 0; i < ghosts.length; i++ ){
    ghosts[i].draw();
  ghosts[i].move();
  }
  //nun touches ghost
  for (let i = 0; i < ghosts.length; i++){
    if(ghostAttack(nun,ghosts[i])){
      score = parseInt((new Date() - startTime) / 1000)
      
     //alert("Game Over, you survived: " + score + " secs")
     
   
     if(confirm("Game Over, you survived: " + score + " secs")){
    resetGame();
    window.location.reload();  
}

      
    }
  }
}
 /* drawSprite(images.ghost,ghostWidth * ghostFrameX,ghostHeight *ghostFrameY,ghostWidth, ghostHeight,ghostX,ghostY,ghostWidth, ghostHeight);

  if (ghostFrameX < 3) {ghostFrameX++;
  }else{
    ghostFrameX - 1;
  }
  // move ghost
  if (ghostX < canvas.width + ghostWidth){
    ghostX += ghostSpeed;
  }
  else{
    ghostX = 0 - ghostWidth;
  } */



const keys = [];

const nun = {
    x: 600, 
    y: 400,
    height : 48,
    width : 32,
    frameX : 0, 
    frameY : 0,
    speed : 6,
    moving: false
    
  };

  const nunSprite = new Image();
  nunSprite.src = "Nun-1.PNG"

  function drawNun(img, sX,sY,sW,sH,dX,dY,dW,dH){
  ctx.drawImage(img, sX,sY,sW,sH,dX,dY,dW,dH);
}


  window.addEventListener("keydown", function(event){
    keys[event.keyCode] = true;//everytime a key is pressed we add it into he keys array
    nun.moving = true;
    
  });
    window.addEventListener("keyup", function(event){
    delete keys[event.keyCode];//everytime a key is released 
    nun.moving = false;
  });
  
function moveNun(){
  //38 is the up keycode
  if (keys[38]&& nun.y > 120){
    nun.y -= nun.speed;
    nun.frameY = 3;
  }
  //37 is the left keycode
  if(keys[37]&& nun.x >145){
  nun.x -= nun.speed;
  nun.frameY = 1;
  }
  //40 is the down keycode
  //if(keys[40]&& nun.y < canvas.height - nun.height*2.8)
  if(keys[40]&& nun.y < canvas.height - (nun.height*2.8)){
    nun.y += nun.speed;
    nun.frameY =0;
  }
  //39 is the right keycode
  //if(keys[39]&& nun.x < canvas.width - 190)
  //if(keys[39]&& nun.x < canvas.width - (539 + 1))
  if(keys[39]&& nun.x < canvas.width - (nun.height*14)){
    nun.x += nun.speed;
    nun.frameY = 2;
  }
}

function handleNunFrame(){
  if (nun.frameX < 4 && nun.moving){
    nun.frameX++;
  } else {nun.frameX = 0;

}
}


 /*function animate(){
   drawNun(nunSprite,nun.width*nun.frameX,nun.height*nun.frameY, nun.width, nun.height nun.x,nun.y, nun.width, nun.height);
   moveNun();
   handleNunFrame();
   requestAnimationFrame(animate);

 }
  animate();*/

  let fps,fpsInterval, startTime, now, then, elapsed;

  function startAnimating(fps){
    fpsInterval = 1000/fps; //how many milseconds to wait before showing the next frame
    then = Date.now(); //the number of milseconds elapsed since Jan 1st 1970
    startTime = then;
    animate();
  }
function animate(){
  //allows you to show frames at a certain rate that isn't too fast depedning on the computer youre using to run the game. 
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if(elapsed >fpsInterval){
    then = now - (elapsed % fpsInterval);
   
     drawNun(nunSprite,nun.width*nun.frameX,nun.height*nun.frameY, nun.width, nun.height, nun.x,nun.y, nun.width, nun.height);
   moveNun();
   handleNunFrame();
   //scoreBoard();
  
  }
}
startAnimating(60);
 





 //global variables

 //let score = 0;
 //let ghostbump =0;
 //frame
 //gmespeed

/*function scoreBoard(){
  ctx.fillStyle ="white";
  ctx.strokeStyle="white";
  cts.font ='15px Verdanna';
  ctx.strokeText ('Score', 270, 150)
  ctx.font ='60px Verdanna';
  ctx.fillText(score,290, 200);

}*/

// when the nun touches a ghost

function ghostAttack(first,second){
  return !( first.x > second.x +second.width - 50|| //first.x is the left, first.width is the right
          first.x + first.width - 50 <second.x ||
          first.y > second.y + second.height -5  ||
          first.y + first.height - 60 < second.y );
          
           //if any of these are true then the nun did not touch a ghost. ! returns these as false. if all these statments are not true  the nun did touch the ghost. ! returns these as true (double neg)
}

function resetGame(){
      
    nun.x= -  1000; 
    nun.y= -1000;
   
    
}



    
    /* SCORE */
    /*var starttime;
    // ending elapsed time in seconds
    var score;

    function drawElapsedTime() {
      
        var elapsed = parseInt((new Date() - starttime) / 1000);
        //ctx.save();
        //ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.font = "14px Verdana"
        // draw the running time at half opacity
        //ctx.globalAlpha = 0.50;
        ctx.fillText(elapsed + " secs", canvas.width - 75, 25);
        //ctx.restore();
    }

    function drawFinalScore() {

        // set the final score just once
        if (score == null) {
            score = parseInt((new Date() - starttime) / 1000);
        }
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.font = "30px Verdana"
        ctx.fillText("Game Over: " + score + " secs", 50, 35);
        ctx.restore();
    }*/

window.onload = alert("GHOST RUN. HOW LONG CAN YOU SURVIVE? CLICK THE SCREEN TO START.");
window.addEventListener('click', function(){
   setInterval(animateGhost,1000/30);

}); 
window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}); 
