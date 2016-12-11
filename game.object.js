function Game() {
	this.over = false;

	this.drawGameOver = drawGameOver;




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

		ctx.restore();
	}
}