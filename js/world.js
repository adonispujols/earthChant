var earthChant = earthChant || {}; // calling from base game

earthChant.World = function(){};

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {preload: preload, 
create: create, update: update, render: render});

function preload(){
	game.stage.backgroundColor = '#007000';
	// loading sprite sheet. key, url, width, hieght, frames
	game.load.spritesheet('betty','assets/betty.png', 48, 48, 16);
	game.load.spritesheet('betty1','assets/betty.png', 48, 48, 16);
}

// setting these variables as global for use after create()
var betty;
var sara_X_speed = 200;
var sara_Y_speed = 200;
var bettyDirection = 0;  //resets direciton when game starts
var enemy;
var cursors;

function create(){
	// bounds of world (negatives sets bounds beyond top left)
	game.world.setBounds( 0, 0, 2000, 2000);

	// staring physics system, for easy movement control/collision detection
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// adding our sprites to game (betty is at the world'ss center x and y)
	betty = game.add.sprite(game.world.centerX,game.world.centerY, 'betty');

	// actuall enabling arcade physics on betty var (object)
	game.physics.arcade.enable(betty);
	betty.enableBody = true;
	betty.scale.setTo(1.5, 1.5); //rescalling betty

	// same for our enemy
	enemy = game.add.sprite(1000,1200, 'betty1');
	//eanbling physics for enemy
	game.physics.arcade.enable(enemy);
	enemy.enableBody = true;
	enemy.body.immovable= true;

	// cursor controls (arrow keys)
	cursors = game.input.keyboard.createCursorKeys();

	// camera follow character (As easy as that!)
	game.camera.follow(betty);

	// walk animation for betty (key, list of frames, framerate,loop t/f
	// left= walk left, right =walk right, etc)
	betty.animations.add('down', [0,4,8,12],10,true);
	betty.animations.add('left', [1,5,9,13],10,true);
	betty.animations.add('up', [2,6,10,14],10,true);
	betty.animations.add('right', [3,7,11,15],10,true);
}

function update(){
	//plays battle scene when betty and enemy collide
	game.physics.arcade.overlap(betty, enemy, loadBattle());

	// creating movement for betty (she )
	// reseting velocity x and y to zero
	betty.body.velocity.x = 0;
	betty.body.velocity.y = 0;
	// store direction betty is facing (the frame for our .stop() function)
	if (cursors.down.isDown) {
		betty.body.velocity.y = sara_Y_speed;
		betty.animations.play('down');
		bettyDirection = 0;
	} 
	else if (cursors.left.isDown) {
		betty.body.velocity.x = -sara_X_speed;
		betty.animations.play('left');
		bettyDirection = 1;
	} 
	else if (cursors.up.isDown) {
		betty.body.velocity.y = -sara_Y_speed;
		betty.animations.play('up');
		bettyDirection = 2;
	} 
	else if (cursors.right.isDown) {
		betty.body.velocity.x = sara_X_speed;
		betty.animations.play('right');
		bettyDirection = 3;
	} else {
		//  when not in motion, betty will stop
		betty.animations.stop()
		betty.frame = bettyDirection;
	}

	function loadBattle(){
		
	}
}

// gives us more info about world
function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(betty, 32, 500);
}