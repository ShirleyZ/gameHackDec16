// initialising values
var width= window.innerWidth;
var height = width / 2;

var player = {};
// Background (back/mid/front)
var bgb = {width: 600}
var bgm = {width: 600}
var bgf = {width: 600}

var keymovepower=0.2;

var keys = [];
window.onkeyup = function(e) {keys[e.keyCode]=false;}
window.onkeydown = function(e) {keys[e.keyCode]=true;}

init();


var ONE_FRAME_TIME = 1000 / 60 ;
var PLAYER_RIGHT_BOUNDARY = width/2 + 100;
var PLAYER_LEFT_BOUNDARY = width/2;

var mainloop = function() {
	updateGame();
	drawGame();
};

setInterval( mainloop, ONE_FRAME_TIME );

function init() {
	canvas.width  = width
	canvas.height = height;
	canvas.imageSmoothingEnabled = true;

	player.x=width/2; //Init player
	player.y=300;
	player.xspeed=15;
	player.yspeed=0;

	bgb.y1=0;
	bgm.y1=100;
	bgf.y1=200;

	bgb.x1=0;
	bgm.x1=0;
	bgf.x1=0;
	
	bgb.x2=bgb.width;
	bgm.x2=bgm.width;
	bgf.x2=bgf.width;

	bgb.x3=2*bgb.width;
	bgm.x3=2*bgm.width;
	bgf.x3=2*bgf.width;
}

function drawGame(){
	var ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000";
	ctx.fillRect(bgb.x1,0,bgb.width,200);
	ctx.fillStyle = "#010101";
	ctx.fillRect(bgb.x2,0,bgb.width,200);
	ctx.fillStyle = "#272727";
	ctx.fillRect(bgb.x3,0,bgb.width,200);
	// ctx.fillRect(bgb.x1+BG_OFFSET,0,600,200);
	
	ctx.fillStyle = "#b6b6b6";
	ctx.fillRect(bgm.x1,bgm.y1,bgm.width,200);
	ctx.fillRect(bgm.x2,bgm.y1,bgm.width,200);
	ctx.fillRect(bgm.x3,bgm.y1,bgm.width,200);
	// ctx.fillRect(bgm.x1+BG_OFFSET,bgm.y1,600,200);
	
	ctx.fillStyle = "#808080";
	ctx.fillRect(bgf.x1,bgf.y1,bgm.width,200);
	ctx.fillStyle = "#868686";
	ctx.fillRect(bgf.x2,bgf.y1,bgm.width,200);
	ctx.fillStyle = "#888888";
	ctx.fillRect(bgf.x3,bgf.y1,bgm.width,200);
	// ctx.fillRect(bgf.x1+BG_OFFSET,bgf.y1,600,200);

	ctx.fillStyle = "black";
	ctx.fillRect(player.x,player.y,50,100);
	ctx.stroke();
}

function updateGame() {
	// keys[32] = Spacebar
	if (keys[32] && player.xspeed > 0)	{
		player.xspeed-=keymovepower;
	} else if (keys[32] && player.xspeed < 0) {
		player.xspeed = 0;
	} else if (player.xspeed < 10) {
		player.xspeed+=keymovepower;
	} else if (player.xspeed > 10) {
		player.xspeed = 10;
	}

	moveObject(bgb,"x1", player.xspeed/10);
	moveObject(bgm,"x1", player.xspeed/5);
	moveObject(bgf,"x1", player.xspeed/2);

	moveObject(bgb,"x2", player.xspeed/10);
	moveObject(bgm,"x2", player.xspeed/5);
	moveObject(bgf,"x2", player.xspeed/2);

	moveObject(bgb,"x3", player.xspeed/10);
	moveObject(bgm,"x3", player.xspeed/5);
	moveObject(bgf,"x3", player.xspeed/2);

}

function moveObject(obj, property, speed) {
	obj[property] -= speed;
	var num = 0 - obj.width;
	if (obj[property] < num ) {
		obj[property] = width;
	}
}