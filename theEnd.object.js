// Initialisers/Object creation

// CHEATING FOR NOW UNTIL I FIGURE OUT THIS INITIALISER
function TheEnd() {
	this.progress = 0-THEEND_DELAY;
	this.isNear = 0;

	this.update = function() {
		this.progress+=0.65;
		this.isNear = time - this.progress;

		if (this.isNear <= 0) {
			game.state = GAME_STATE_OVER;
			console.log("GAME IS OVER");
		}
	}

	this.draw = function() {
		ctx.save()
		if (this.isNear < THEEND_DELAY) {
			ctx.globalAlpha = 1- this.isNear/THEEND_DELAY;
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
		}
		ctx.restore();

		// ctx.fillStyle = "white";
		// ctx.font = "20px sans-serif";
		// ctx.fillText(this.progress, 10, height-20);
		// ctx.fillText(this.isNear, 100, height-20);
	}
	return this;
}