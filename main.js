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
const ghostsActions = ['up','right', 'down right', 'down']
const ghosts = [];


class Ghost {
  constructor(){
    this.width = 180.0625;
    this.height = 113.125;
    this.frameX = 0;
    this.frameY =0;
    this.x =0;
    this.y =0;
    this.speed = (Math.random()* 1.5)+3.5;
    
  }
  draw(){
    drawGhost(images.ghost,this.width * this.frameX,this.height *this.frameY,this.width, this.height,this.x,this.y,this.width, this.height);

    if (this.frameX < 3) {this.frameX++;
   }else{
    this.frameX = 2;
  }

  }
  move(){
   if(this.action === 'right'){
       // move ghost
  if (this.x < canvas.width + this.width){
    this.x += this.speed;
  }
  else{
    this.x = 0 - this.width;
   }
  }
}


// create variables to find a specific sprite in the sheet


ghosts.push(new Ghost());

//first four parameters are from the image source and specfiy what needs to be cropped. The second four parameters are for where the image should go on the canvas.
function drawGhost(img, sX,sY,sW,sH,dX,dY,dW,dH){
  ctx.drawImage(img, sX,sY,sW,sH,dX,dY,dW,dH);
}



function animateGhost(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ghosts[0].draw();
  ghosts[0].move();
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
