function Game() {
	// this.state = GAME_STATE_INSTRUCTIONS;
	// this.time = 0;
	// this.score = 0;

	this.init = function() {
		this.score = 0;
		this.time = 0;
		this.state = GAME_STATE_INSTRUCTIONS;
		this.lossType = 0;
	}

	this.drawIntro = function() {
		ctx.save();

		ctx.fillStyle = "black";
		ctx.fillRect(0,0, width, height);

		ctx.fillStyle = "white";
		ctx.font="25px sans-serif";
		ctx.fillText("Runner", width/6, height/3);
		ctx.font="20px sans-serif";
		ctx.fillText("The world as you know it is over, and The End is coming for us all", width/6, height/3+50);
		ctx.fillText("You need to loot food from the environment to live, and outrun The End to survive", width/6, height/3+100);
		ctx.fillText("* White items are lootable, hold down spacebar to loot, let go to continue running", width/6, height/3+150);
		ctx.fillText("Don't starve, and don't get caught", width/6, height/3+200);
		ctx.fillText("Press space to start", width/6, height/3+300);

		ctx.restore();
	}

	this.drawGameOver = function() {
		ctx.save();

		ctx.fillStyle = "black";
		ctx.fillRect(0,0, width, height);
		ctx.fillStyle = "white";
		ctx.font="25px sans-serif";
		ctx.fillText("Game Over", width/3, height/3-50);
		if (this.lossType == GAME_OVER_HUNGER) {
			ctx.fillText("You have starved", width/3, height/3);
		} else if (this.lossType == GAME_OVER_CAUGHT) {
			ctx.fillText("You have been caught", width/3, height/3);
		}
		ctx.font="20px sans-serif";
		ctx.fillText("Survived for: "+this.time, width/3, height/3+50);
		ctx.fillText("Item points: "+this.score, width/3, height/3+100);
		ctx.fillText("Total Score: "+(this.time+this.score), width/3, height/3+150);
		ctx.fillText("Press R to restart", width/3, height/3+250);

		ctx.restore();
	}
}