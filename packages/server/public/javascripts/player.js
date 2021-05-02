// https://jsfiddle.net/hche/3hka68wj/2/
// title: race car

var playerimg = new Image();
playerimg.onload = new (function() {
  playerimg.src =
    "http://www.carblogindia.com/wp-content/uploads/2012/03/Tata-MegaPixel-Concept-Car-top.jpg";
})();
var canvas = document.createElement("canvas");
var width = (canvas.width = window.innerWidth);
var height = (canvas.height = window.innerHeight);
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
document.addEventListener("keydown", onKeyDown);
var y = 218;
var x = 258;
var velx = 0;
var vely = 0;
setInterval(update, 50);

function update() {
  x += velx;
  y += vely;
  ctx.fillStyle = "purple";
  ctx.fillRect(0, 0, 10000000000000, 1000000000000);
  ctx.fillStyle = "red";
  ctx.clearRect(0, 0, width, height);
  ctx.fillRect(x, y, 10, 10);
  ctx.fillStyle = "black";
  ctx.fillRect(-10, 50, 10000000000000, 1);
  ctx.fillRect(50, -10, 1, 100000000000);
  ctx.fillRect(490, -10, 1, 100000000000);
  ctx.fillRect(-10, 390, 10000000000000, 1);
  if (x <= 30000 && y <= 50) {
    x = x;
    y = y;
    velx = 0;
    vely = 0;
  }
  if (x <= 50 && y <= 30000) {
    x = 480;
    y = y;
    velx = velx;
    vely = vely;
  }
  if (x >= 490 && y <= 30000) {
    x = 60;
    y = y;
    velx = velx;
    vely = vely;
  }
  if (x <= 30000 && y >= 390) {
    x = x;
    y = y;
    velx = velx;
    vely = vely;
  }

  //if (x <= 50 && x >= 0 && y >= 0 && y <= 50) {
  //x = 200;
  //y = 200;
  //velx = 0;
  //vely = 0;
  //}
}

function onKeyDown(e) {
  if (e.keyCode == 38) {
    vely = -20;
    velx = 0;
  }
  if (e.keyCode == 40) {
    vely = 20;
    velx = 0;
  }
  if (e.keyCode == 39) {
    velx = 20;
    vely = 0;
  }
  if (e.keyCode == 37) {
    velx = -20;
    vely = 0;
  }
  if (e.keyCode == 16) {
    velx = 0;
    vely = 0;
  }
}
