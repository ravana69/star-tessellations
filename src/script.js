let sqr3 = Math.sqrt(3);

function setup (){
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

let tile;
let size = 500;
let side = size/2;
let tHeight = size*sqr3/2;
let cellSize = 300;
let p;
let init = () => {
  tile = createGraphics(size, size);
  tile.colorMode(HSB, 1, 1, 1);
  
  let a = random(TAU);
  p = {x:random(width), y:random(height), dx:cos(a), dy:sin(a)}
}

let drawTile = () => {
  // tile.background(1);
  tile.strokeCap(PROJECT)
  
  p.x += p.dx*2;
  p.y += p.dy*2;
  
  if (p.x < 0) p.dx *= -1;
  if (p.y < 0) p.dy *= -1;
  
  tile.clear();
  tile.push();
  tile.stroke(0, 1, 1);
  tile.translate(size/2, size/2);
  tile.stroke(.15, 1, 1);
  tile.stroke(.5, 1, .7);
  tile.strokeWeight(20);
  
  let x = (p.x/width - .5)*.4*side/2 + side/2;
  let a = (p.y/height - .5)*.3*PI;
      
  for (let n = 0; n < 2; n++){
    tile.push();
    if (n == 1){
      tile.stroke(.15, 1, 1);
      tile.strokeWeight(10);
    }
    for (let i = 0; i < 6; i++){
      tile.push();
      tile.rotate(i*TAU/6);
      tile.translate(size/2, 0);
      for (let j = 0; j < 2; j++){
        tile.push();
        if (j == 1) tile.scale(1, -1);
        tile.rotate(PI - PI/3);
        tile.translate(x, 0);

        tile.rotate(PI*1.5/3);
        tile.rotate(a);
        tile.line(0, 0, size, 0);
        tile.pop();
      }
      tile.pop();
    }
    
    tile.pop();
  }
  tile.pop();
  maskTile();
}

let maskTile = () => {
  let y = size/2;
  let x = y/sqr3;
  tile.fill(0);
  tile.noStroke();
  
  let y2 = y - (y/2)*sqr3;
  
  let dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  
  tile.push();
  tile.translate(y, y);
  for (let d of dirs){
    tile.push();
    tile.scale(...d);
    tile.translate(-y, -y)
    tile.triangle(0, 0, x, 0, 0, y);
    tile.pop();
  }
  tile.pop();
  tile.rect(0, 0, size, y2);
  tile.rect(0, size-y2, size, y2);
}

function draw(){
  blendMode(BLEND);
  background(0);
  
  drawTile();
  translate(width/2, height/2);
  imageMode(CENTER);
  blendMode(ADD);
  
  let s = cellSize/size;
  
  let x = ceil((width/cellSize)/4) + 1;
  let y = ceil((height/(tHeight*s))) + 1;
  
  scale(s);
  for (let i = -x; i < x; i++){
    for (let j = -y; j < y; j++){
      image(tile, size*(i+(j%2)/2)*1.5, j*tHeight/2);
    }
  }
  
  // image(tile, size*3/4, -tHeight/2);
  // image(tile, 0, -tHeight);
}

function mousePressed(){init();}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}