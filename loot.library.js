var Loot = {
	"spider": {
		name: "spider",
		srcImg: "img/spider.png",
		xoffset: 0,
		yoffset: 20,
		width: 200,
		height:50,
		treasure: [
			{name: "Spider Leg",score: 400,nutrition:MAX_HUNGER/4},
			{name: "Spider Ooze",score: 600,nutrition:MAX_HUNGER/3},
			{name: "Rock",score: 200,nutrition:MAX_HUNGER/5}
		]
	},
	"soldier": {
		name: "soldier",
		srcImg: "img/soldier.png",
		xoffset: 50,
		yoffset: 0,
		width: 100,
		height: 100,
		treasure: [
			{name: "Stale bread",score: 300,nutrition:MAX_HUNGER/3},
			{name: "Bottle of water",score: 900,nutrition:MAX_HUNGER/4},
			{name: "Cloth",score: 100,nutrition:MAX_HUNGER/5}
		]
	}

}