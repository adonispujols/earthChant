var earthChant = earthChant || {}; // calling from base game
//NOTES NOTES NOTES NOTES:

//MAJOR:
// TOO SIMILAR TO POKEMON! (keep button system)
// FOCUS GAME ON POLLUTION!!!
// TURN INTO MINI RPG ENGINE (easily manipulable)
	// BE MORE EFFICIENT 
	// USE JSON ++ PHASER'S GROUP CONSTRUCTOR (pass objects and entire properties through parameters)

//MINOR:
// FIX/ADD COMMENTS (explain how to add more compnonets (i.e., coppy and paste here but change this property))
// STORE PLAYER'S LOCATION WHEN LEAVING BATTLE
// USE BOOTSTRAP TO RESIZE SCREEN 
// MAKE ENEMIES RESCALE DEPENDING ON SPRITE

// setting up state
earthChant.World = function(){};

//setting up vraibles, functions, and objects of world
earthChant.World.prototype = {

	// locally storing variables (parameters available to all states)
	// updating enemy properties from Battle.state
	init: function(enemyDead, enemyBattle_number) {
    var enemyDead = enemyDead || false;      // if there is a value, use it, if not, use false
    this.enemyDead = enemyDead;        // assigns boolean if an enemy was killed or not 

    var enemyBattle_number = enemyBattle_number || null;
    this.enemyBattle_number = enemyBattle_number; // takes enemy's number from Battle

    this.deadEnemies = this.deadEnemies || [];   // creates permanent list of dead enemies
   	if (this.enemyDead){
   		this.deadEnemies.push(this.enemyBattle_number);    // adds the enemy's number 
   	}
   },
  create: function() {
	// bounds and color of world (negatives sets bounds beyond top left)
	this.game.world.setBounds( 0, 0, 2000, 2000);
	this.game.stage.backgroundColor = '#007000';

	//setting up variables for objects
	this.betty;
	this.sara_X_speed = 300;
	this.sara_Y_speed = 300;
	this.bettyDirection = 0;  //resets direction she faces when game starts
	this.enemy1;           //our enemies
	this.enemy2;
	this.enemy3;
	this.enemy4;
	this.enemyBattle_sprite;     // stores sprite of enemy player ran into (look at loadBattle)
	// this.enemyBattle_number;     // stores enemy's number
	this.cursors;

	// adding our sprites to game (betty is at the world'ss center x and y)
	this.betty = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'betty');

	// actuall enabling arcade physics on betty var (object)
	this.game.physics.arcade.enable(this.betty);
	this.betty.enableBody = true;
	this.betty.body.collideWorldBounds=true;

	this.betty.scale.setTo(1.5, 1.5); //rescalling betty

	// same for our enemy
	this.enemy1 = this.game.add.sprite(100,1200, 'smog');
	this.enemy2 = this.game.add.sprite(550,1100, 'canEnemy');
	this.enemy3 = this.game.add.sprite(900,1200, 'snake');
	this.enemy4 = this.game.add.sprite(1200,900, 'trashMan');

	// making enemy group and adding enemies to it
	// this.enemyGroup = this.game.add.group(); 
	// this.enemyGroup.add(this.enemy1);
	// this.enemyGroup.add(this.enemy2);
	// this.enemyGroup.add(this.enemy3);
	// this.enemyGroup.add(this.enemy4);

	// enable physics for enemies (individually for now)
	this.game.physics.arcade.enable(this.enemy1);
	this.enemy1.enableBody = true;
	this.game.physics.arcade.enable(this.enemy2);
	this.enemy2.enableBody = true;
	this.game.physics.arcade.enable(this.enemy3);
	this.enemy3.enableBody = true;
	this.game.physics.arcade.enable(this.enemy4);
	this.enemy4.enableBody = true;


	// cycles through the living state of each enemy and kills what is dead
	// TRY TO NOT DRAW SPRITES IN FIRST PLACE IF DEAD
	for (var i = 0; i < this.deadEnemies.length; i++) {
		if (this.deadEnemies[i] == 1){
	    	this.enemy1.kill();
    	}
		if (this.deadEnemies[i] == 2){
	    	this.enemy2.kill();
	    }
		if (this.deadEnemies[i] == 3){
	    	this.enemy3.kill();
	    }
		if (this.deadEnemies[i] == 4){
	    	this.enemy4.kill();
	    	}
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
	// indicates waht enemy was ran into (or "hit")
	// when adding new enemies, create new ENEMY<enemy number>
	// FIGURE OUT HOW TO OPTIMIZE THIS CODE (passing enemyBattle parameter here?)
	this.game.physics.arcade.overlap(this.betty, this.enemy1, this.enemy1Hit, null ,this);
	this.game.physics.arcade.overlap(this.betty, this.enemy2, this.enemy2Hit, null ,this);
	this.game.physics.arcade.overlap(this.betty, this.enemy3, this.enemy3Hit, null ,this);
	this.game.physics.arcade.overlap(this.betty, this.enemy4, this.enemy4Hit, null ,this);

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
	} 
	else {
		//  when not in motion, betty will stop
		this.betty.animations.stop()
		this.betty.frame = this.bettyDirection;
	}
  	},

  	// define what sprite to load in battle when corresponding enemy is ran into
  	// REPETITIVE. SIMPLIFIY CODE (use json or similar)
  	enemy1Hit: function(){
  		this.enemyBattle_sprite = 'smog';  // tells Battle.state the key name of sprite
  		this.enemyBattle_number = 1;  // tells Battle.state the enemy number
  		this.loadBattle();
  	},

  	enemy2Hit: function(){
  		this.enemyBattle_sprite = 'canEnemy';
  		this.enemyBattle_number = 2; 
  		this.loadBattle();
  	},

  	enemy3Hit: function(){
  		this.enemyBattle_sprite = 'snake';
  		this.enemyBattle_number = 3; 
  		this.loadBattle();  	
  	},

  	enemy4Hit: function(){
  		this.enemyBattle_sprite = 'trashMan';
  		this.enemyBattle_number = 4; 
  		this.loadBattle();  	
  	},

	// loading battle scene (state name, reset world t/f, reset cache t/f)
	loadBattle: function() {
	// also telling Battle State what enemy the player will fight (only one enemy for now)
	this.game.state.start('Battle', true, false, this.enemyBattle_sprite, this.enemyBattle_number); 
	},

  	//just some debugging info
  render: function() {
   	this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.betty, 32, 500);
	}
};
