var earthChant = earthChant || {}; // calling from base game

// setting up state
earthChant.World = function(){};

//setting up vraibles, functions, and objects of world
earthChant.World.prototype = {

	//setting up global (across game) variables (sending parameters to state)
	init: function(enemyDead) {
    var enemyDead = enemyDead || false;
    this.enemysDead = enemyDead;
   },
  create: function() {
	// bounds and color of world (negatives sets bounds beyond top left)
	this.game.world.setBounds( 0, 0, 2000, 2000);
	this.game.stage.backgroundColor = '#007000';

	//setting up variables for objects
	this.betty;
	this.sara_X_speed = 200;
	this.sara_Y_speed = 200;
	this.bettyDirection = 0;  //resets direction she faces when game starts
	this.enemy;
	this.cursors;

	// adding our sprites to game (betty is at the world'ss center x and y)
	this.betty = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'betty');

	// actuall enabling arcade physics on betty var (object)
	this.game.physics.arcade.enable(this.betty);
	this.betty.enableBody = true;
	this.betty.scale.setTo(1.5, 1.5); //rescalling betty

	// same for our enemy
	this.enemy = this.game.add.sprite(1000,1200, 'betty1');
	//eanbling physics for enemy
	this.game.physics.arcade.enable(this.enemy);
	this.enemy.enableBody = true;
	this.enemy.body.immovable= true;

	//kill enemy if dead
	if (this.enemysDead){
    	this.enemy.kill();
    }

	// cursor controls (arrow keys)
	this.cursors = this.game.input.keyboard.createCursorKeys();

	// camera follow character (As easy as that!)
	this.game.camera.follow(this.betty);

	// walk animation for betty (key, list of frames, framerate,loop t/f
	// left= walk left, right =walk right, etc)
	this.betty.animations.add('down', [0,4,8,12],10,true);
	this.betty.animations.add('left', [1,5,9,13],10,true);
	this.betty.animations.add('up', [2,6,10,14],10,true);
	this.betty.animations.add('right', [3,7,11,15],10,true);
  },

  update: function() {
	//plays battle scene when betty and enemy collide
	this.game.physics.arcade.overlap(this.betty, this.enemy, this.loadBattle, null ,this);

	// creating movement for betty (she )
	// reseting velocity x and y to zero
	this.betty.body.velocity.x = 0;
	this.betty.body.velocity.y = 0;
	// store direction betty is facing (the frame for our .stop() function)
	if (this.cursors.down.isDown) {
		this.betty.body.velocity.y = this.sara_Y_speed;
		this.betty.animations.play('down');
		this.bettyDirection = 0;
	} 
	else if (this.cursors.left.isDown) {
		this.betty.body.velocity.x = -this.sara_X_speed;
		this.betty.animations.play('left');
		this.bettyDirection = 1;
	} 
	else if (this.cursors.up.isDown) {
		this.betty.body.velocity.y = -this.sara_Y_speed;
		this.betty.animations.play('up');
		this.bettyDirection = 2;
	} 
	else if (this.cursors.right.isDown) {
		this.betty.body.velocity.x = this.sara_X_speed;
		this.betty.animations.play('right');
		this.bettyDirection = 3;
	} else {
		//  when not in motion, betty will stop
		this.betty.animations.stop()
		this.betty.frame = this.bettyDirection;
	}
  },

	// loading battle scene (state name, reset world t/f, reset cache t/f)
	loadBattle: function(betty, enemy) {
	this.game.state.start('Battle', true, false); 
	},

  	//just some debugging info
  render: function() {
   	this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.betty, 32, 500);
	}
};
