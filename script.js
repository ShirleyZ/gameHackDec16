var ctx = canvas.getContext("2d");

var game;
var player = {width: 50,looting:0};
var enviro = {lootAnimation:0};
// Background (back/mid/front)
var bgb = {width: 2100};
var bgm = {width: 600};
var bgf = {width: 1526};
var bgbImg;
var bgfImg;

var keymovepower = 0.4;

var lootNodes = [];
var keys = [];
window.onkeyup = function(e) {keys[e.keyCode]=false;}
window.onkeydown = function(e) {keys[e.keyCode]=true;}

var timeScore = 0;
var time = 0;
var score = 0;
var theEnd = new TheEnd();

init();

var mainloop = function() {
	updateGame();
	drawGame();
};

setInterval( mainloop, ONE_FRAME_TIME );

function init() {
	game = new Game();

	canvas.width  = width
	canvas.height = height;
	canvas.imageSmoothingEnabled = true;
	
	player.x = width/2; // Init player
	player.y = PLAYER_OFFSET;
	player.xspeed = 15;
	player.yspeed = 0;
	player.hunger = 0;
	player.feed = function(nutrition) {
		player.hunger-=nutrition;
		if (player.hunger < 0) {
			player.hunger = 0;
		}

	}

	bgbImg = new Image();
	bgbImg.src = 'img/bgb.png';
	bgfImg = new Image();
	bgfImg.src = 'img/bgf.png';

	// Setting bg height stagger for parallax effect
	bgb.y = BGB_OFFSET; bgm.y = BGM_OFFSET; bgf.y = BGF_OFFSET;

	// Each bg image has 3 instances to enable smooth scrolling
	// This is initialising offset for each
	bgb.x1 = 0; bgm.x1 = 0; bgf.x1 = 0;
	bgb.x2 = bgb.width; bgm.x2 = bgm.width; bgf.x2 = bgf.width;
	bgb.x3 = 2*bgb.width; bgm.x3 = 2*bgm.width; bgf.x3 = 2*bgf.width;

	
}

function drawBackground() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(bgbImg,bgb.x1,bgb.y);
	ctx.drawImage(bgbImg,bgb.x2,bgb.y);
	ctx.drawImage(bgbImg,bgb.x3,bgb.y);
	
	ctx.drawImage(bgfImg,bgf.x1,bgf.y);
	ctx.drawImage(bgfImg,bgf.x2,bgf.y);
	ctx.drawImage(bgfImg,bgf.x3,bgf.y);
	
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, width, 150);
}

// function sprite(x, y, srcImg){
// 	this.x = x;
// 	this.y = y;
// 	this.srcImg = srcImg;

// 	this.draw = function(ctx){
// 		ctx.save();

// 		ctx.restore();
// 	}
// }

function drawGame(){
	if (!game.over) {
		ctx.save();
		ctx.translate(0, canvas.height);
		ctx.scale(1, -1);
		drawBackground();
	
		ctx.fillStyle = "green";
		for (var i = 0; i < lootNodes.length; i++) {
			ctx.fillRect(lootNodes[i].x,lootNodes[i].y, lootNodes[i].nodeInfo.width, lootNodes[i].nodeInfo.height);
		}
	
		drawPlayer();
	
		ctx.restore();
		drawUI();
	
	
		if (enviro.lootAnimation != 0) {
			// If I want more than one thing to pop up, need array to q it
			ctx.fillStyle = "grey";
			ctx.fillRect(width/2 + 10, PLAYER_OFFSET + 150 - enviro.lootAnimation, 30,30);
		}
		theEnd.draw();
	} else {
		game.drawGameOver();

	}
}

function drawPlayer() {
	ctx.save();
	
	if (player.looting != 0) {
		ctx.fillStyle = "#b7b7b7";
	} else {
		ctx.fillStyle = "grey";
	}
	ctx.fillRect(player.x,player.y,player.width,100);

	ctx.restore();
}

function drawUI() {
	ctx.save();

	// Score
	ctx.fillStyle = "white";
	ctx.font = "20px sans-serif";
	ctx.fillText(time+score, 10, 20);

	// Hunger bar
	ctx.fillText("Hunger", 20, height-30-UI_HUNGER_HEIGHT);
	ctx.fillStyle = "#b6b6b6";
	ctx.fillRect(20, height-50, UI_HUNGER_WIDTH, UI_HUNGER_HEIGHT);
	ctx.fillStyle = "#fff";
	ctx.fillRect(20, height-50, (player.hunger/MAX_HUNGER)*UI_HUNGER_WIDTH, UI_HUNGER_HEIGHT);

	ctx.restore();
}

function isAtLootNode() {
	// Checks current player position against existing nodes
	// Returns -1 if not valid
	// Returns the index number of node it's active at 
	var playerWindowStart = player.x;
	var playerWindowEnd = player.x + player.width;

	for (var i = 0; i < lootNodes.length; i++) {
		var currNode = lootNodes[i];

		var lootWindowStart = currNode.x;
		var lootWindowEnd = currNode.x + currNode.nodeInfo.width;
		if (lootWindowStart < playerWindowEnd && 
				playerWindowStart < lootWindowEnd) {
			return i;
		}
	}

	return -1;
}

function moveObject(lootNode, property, speed) {	
	lootNode[property].x -= speed;
	var offscreenPos = 0 - lootNode[property].nodeInfo.width;
	if (lootNode[property].x < offscreenPos ) {
		lootNode.shift();
	}
}

function moveBackground(obj, property, speed) {
	if (speed != 0) {
		obj[property] -= speed;
	}
	var num = 0 - obj.width;
	if (obj[property] < num ) {
		obj[property] = width;
	}
}

function updateGame() {
	if (!game.over) {
		// Update score
		if (player.xspeed > 5) {
			time+=1;
		}

		updatePlayer();
		theEnd.update();
		updateLootNodes();
		updateLooting();
		updateBackground();
	} else {

	}
	
}


function updateLooting() {
	var lootingThis = isAtLootNode();
	if (player.xspeed < 5 && lootingThis != -1) {
		console.log("SWEET, SWEET LOOT");
		player.looting += 1;
		if (player.looting >= LOOT_TIMER) {
			player.looting = 0;
			var maxNum = lootNodes[lootingThis].nodeInfo.treasure.length;
			// Grant a random loot
			var item = Math.round(Math.random(new Date()) * (maxNum - 1));
			score+=lootNodes[lootingThis].nodeInfo.treasure[item].score;

			player.feed(lootNodes[lootingThis].nodeInfo.treasure[item].nutrition);
			enviro.lootAnimation = 1;
		}

		if (enviro.lootAnimation != 0) {
			enviro.lootAnimation+=1;
			if (enviro.lootAnimation == LOOT_ANIMATION_TIMER) {
				enviro.lootAnimation = 0;
			}	
		}
		
	} else {
		player.looting = 0;
		enviro.lootAnimation = 0;
	}
}

function updateLootNodes() {
	var lootMax = 20;
	var lootMin = 0;

	// Loot generation
	if (time % 200 == 0) {
		var lootRand = Math.random(new Date()) * (lootMax - lootMin) + lootMin;
		var lootType = {};
		if (lootRand > 15) {
			lootType = Loot.spider;
			console.log("Incoming spoider!");
		} else if (lootRand > 10) {
			lootType = Loot.fridge;
			console.log("Incoming fridge!");
		}
	
		lootNodes.push({x: width, y: PLAYER_OFFSET, nodeInfo: lootType});
	}

	// Loot movement
	for (var i = 0 ; i < lootNodes.length; i++) {
		moveObject(lootNodes, i, player.xspeed/2);
	}
}

function updateBackground() {
	// keys[32] = Spacebar
	if (keys[32] && player.xspeed > 0)	{
		player.xspeed-=keymovepower;
		
	} else if (keys[32] && player.xspeed <= 0) {
		player.xspeed = 0;
	} else if (player.xspeed < 10) {
		player.xspeed+=keymovepower;
	} else if (player.xspeed > 10) {
		player.xspeed = 10;
	}

	moveBackground(bgb,"x1", player.xspeed/10);
	moveBackground(bgm,"x1", player.xspeed/5);
	moveBackground(bgf,"x1", player.xspeed/2);

	moveBackground(bgb,"x2", player.xspeed/10);
	moveBackground(bgm,"x2", player.xspeed/5);
	moveBackground(bgf,"x2", player.xspeed/2);

	moveBackground(bgb,"x3", player.xspeed/10);
	moveBackground(bgm,"x3", player.xspeed/5);
	moveBackground(bgf,"x3", player.xspeed/2);

}

function updatePlayer() {
	player.hunger+=1;

	if (player.hunger == MAX_HUNGER) {
		game.over = true;
	}
}