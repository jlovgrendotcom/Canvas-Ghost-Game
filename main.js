const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/*An API, that creates a context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.*/
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// load images
const images = {};
images.ghost = new Image();
images.pghost = new Image();
images.fghost = new Image();
images.ghost.src = 'Ghost.png';
images.pghost.src = 'PeacefulGhost.png';
images.fghost.src = 'FastGhost.png';
//const ghostsActions = ['up','right', 'down right', 'down']
const ghostsActions = ['up','right'];
const numberofGhosts = 2;
const ghosts = [];


class Ghost {
  constructor(){
    this.height = 197; //h & w of sprite on sprite sheet
    this.width = 128;
    this.frameX = 0; //cordinates on spirte sheet so we know which image
    this.frameY =0;
    this.x =Math.random()* canvas.width; // coordinates for where we want the sprite on the background image
    this.y =Math.random()* canvas.height;//use math.random so the ghost arent on top of each other
    this.speed = 6;
    this.action = ghostsActions [Math.floor(Math.random()* ghostsActions.length)]; // randomnizes the index selction of which direction the ghost will go. Math.floor rounds down to an even number.
    if(this.action === 'up'){
         this.frameY = 3;
       
    }else {
      this.frameY =1;
      this.height = 290; //The sprite sheet is uneven so I have to change the height and width depending on which frame/direction I want
    this.width = 130;
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
      this.y = Math.random()* (canvas.height - this.height);
        //randomly appears on the background. Minus the ghodt height so that it doesnt spawn off screen
    
    }
    else{
      // move ghost
      this.x += this.speed;
    }
  }else if (this.action === 'up' ){
    
    if (this.y < (0 -this.height)){
      this.y = canvas.height + this.height;
      this.x = Math.random() * canvas.width;
      
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

}


window.onload = setInterval(animateGhost,1000/30);

window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}) 
