var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload: preload, 
create: create, update: update, render: render});
function preload(){
	game.stage.backgroundColor = '#007000';
	// loading sprite sheet. key, url, width, hieght, frames
	game.load.atlas('saraOvr','assets/saraOvr.png','assets/atlas.json',
		Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	game.load.image('forest','assets/forest_tiles.png');
}
// setting these variables as global for use after create()
var saraOvr;
var sara_X_speed = 200;
var sara_Y_speed = 200;
var saraOvrDirection=1;  //resets direciton when game starts
var forest;
var cursors;
function create(){
	// bounds of world (negatives sets bounds beyond top left)
	game.world.setBounds(0,0,2000,2000)
	// staring physics system, for easy movement control/collision detection
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// adding our sprites to game (saraOvr is at the world'ss center x and y)
	saraOvr = game.add.sprite(game.world.centerX,game.world.centerY, 'saraOvr');
	// actuall enabling arcade physics on saraOvr var (object)
	game.physics.arcade.enable(saraOvr);
	saraOvr.enableBody = true;
	saraOvr.scale.setTo(1.5, 1.5);

	forest = game.add.sprite(1000,1200, 'forest');
	// same for our forest
	game.physics.arcade.enable(forest);
	forest.enableBody = true;
	forest.body.immovable= true;
	// cursor controls (arrow keys)
	cursors = game.input.keyboard.createCursorKeys();
	// camera follow character (As easy as that!)
	game.camera.follow(saraOvr);
	// walk animation for saraOvr (key, list of frames, framerate,loop t/f
	// left= walk left, right =walk right, etc)
	saraOvr.animations.add('down', [0,1,2],10,true);
	saraOvr.animations.add('left', [3,4,5],10,true);
	saraOvr.animations.add('up', [9,10,11],10,true);
	saraOvr.animations.add('right', [6,7,8],10,true);
}
function update(){
	game.physics.arcade.overlap(saraOvr, forest, loadBattle());
	// creating movement for saraOvr (she )
	// reseting velocity x and y to zero
	saraOvr.body.velocity.x = 0;
	saraOvr.body.velocity.y = 0;
	// store direction saraOvr is facing (the frame for our .stop() function)
	if (cursors.down.isDown) {
		saraOvr.body.velocity.y = sara_Y_speed;
		saraOvr.animations.play('down');
		saraOvrDirection = 1;
	} else if (cursors.left.isDown) {
		saraOvr.body.velocity.x = -sara_X_speed;
		saraOvr.animations.play('left');
		saraOvrDirection = 4;
	} else if (cursors.up.isDown) {
		saraOvr.body.velocity.y = -sara_Y_speed;
		saraOvr.animations.play('up');
		saraOvrDirection = 10;
	} else if (cursors.right.isDown) {
		saraOvr.body.velocity.x = sara_X_speed;
		saraOvr.animations.play('right');
		saraOvrDirection = 7;
	} else {
		//  when not in motion, saraOvr will stop
		saraOvr.animations.stop()
		saraOvr.frame = saraOvrDirection;
	}
	function loadBattle(){
		
	}
}
function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(saraOvr, 32, 500);
}