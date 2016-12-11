function Game() {
	this.state = GAME_STATE_INSTRUCTIONS;

	this.drawGameOver = drawGameOver;
	this.drawIntro = drawIntro;





	function drawIntro() {
		ctx.save();

		ctx.fillStyle = "black";
		ctx.fillRect(0,0, width, height);

		ctx.fillStyle = "white";
		ctx.font="25px sans-serif";
		ctx.fillText("Runner", width/6, height/3);
		ctx.font="20px sans-serif";
		ctx.fillText("The world as you know it is over, and The End is coming for us all", width/6, height/3+50);
		ctx.fillText("You need to loot food from the environment to live, and outrun The End to survive", width/6, height/3+100);
		ctx.fillText("* Green boxes are lootable, hold down spacebar to loot, let go to continue running", width/6, height/3+150);
		ctx.fillText("Don't starve, and don't get caught", width/6, height/3+200);
		ctx.fillText("Press space to start", width/6, height/3+300);

		ctx.restore();
	}

	function drawGameOver() {
		ctx.save();

		ctx.fillStyle = "black";
		ctx.fillRect(0,0, width, height);
		ctx.fillStyle = "white";
		ctx.font="25px sans-serif";
		ctx.fillText("Game Over", width/2, height/3);
		ctx.font="20px sans-serif";
		ctx.fillText("Survived for: "+time, width/2, height/3+50);
		ctx.fillText("Item points: "+score, width/2, height/3+100);
		ctx.fillText("Total Score: "+(time+score), width/2, height/3+150);
		ctx.fillText("Press R to restart", width/2, height/3+250);

		ctx.restore();
	}
}