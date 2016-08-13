var earthChant = earthChant || {}; // calling from base game
//NOTES NOTES NOTES NOTES:

//MAJOR:
// TOO SIMILAR TO POKEMON! (keep button system)
// FOCUS GAME ON POLLUTION!!!
// TURN INTO MINI RPG ENGINE (easily manipulable)
	// BE MORE EFFICIENT (more phaser constructors, variables, etc..)
		// USE JSON ++ PHASER'S GROUP CONSTRUCTOR (pass objects and entire properties through parameters)
	// WRITE DOCUMENTAION ON CODE 
		// How to add/manipulate components (i.e. 'Add another enemy to scene by doing...')

//MINOR:
// FIX/ADD COMMENTS 
// STORE PLAYER'S LOCATION WHEN LEAVING BATTLE
// USE BOOTSTRAP TO RESIZE SCREEN 
// MAKE ENEMIES RESCALE DEPENDING ON SPRITE

// setting up state
earthChant.World = function(){};

//setting up vraibles, functions, and objects of world
earthChant.World.prototype = {

	// 'permanently' storing variables (parameters available to all states)
	init: function(enemyDead) {    // updating enemy properties from Battle.state
    var enemyDead = enemyDead || false;      // assumes no enemies are dead if no parameters are passed
    this.enemyDead = enemyDead;        // assigns boolean if an enemy was killed or not 

    this.enemyBattle_number; // stores what enemy (by  number, i.e. enemy1=1, enemy2=2...) player was battling

    this.deadEnemies = this.deadEnemies || [];   // permanent list of dead enemies (creates empty list if nothing set yet)
   	if (this.enemyDead){
   		this.deadEnemies.push(this.enemyBattle_number);    // adds the enemy's number 
   	}

   	// TRY PASSING THESE TWO PARAMETERS AS ONE VARIABLE/GROUP 
	this.playerLocation_X  = this.playerLocation_X || this.game.world.center.X;  // current player's location on World (assumes center if nothing chaned)
	this.playerLocation_Y  = this.playerLocation_Y || this.game.world.center.Y;  // current player's location on World (assumes center if nothing chaned)
   },
  create: function() {
	// bounds and color of world (negatives sets bounds beyond top left)
	this.game.world.setBounds( 0, 0, 2000, 2000);
	this.game.stage.backgroundColor = '#007000';

	//setting up variables for objects
	this.player;
	this.player_X_speed = 300;
	this.player_Y_speed = 300;
	this.playerDirection = 0;  //resets direction she faces when game starts
	this.enemy1;           //our enemies
	this.enemy2;
	this.enemy3;
	this.enemy4;
	this.enemyBattle_sprite;     // stores sprite of enemy player ran into (look at loadBattle)
	// this.enemyBattle_number;     // stores enemy's number
	this.cursors;

	// adding our sprites to game (player is at the world'ss center x and y)
	this.player = this.game.add.sprite(this.playerLocation, 'betty');

	// actuall enabling arcade physics on player var (object)
	this.game.physics.arcade.enable(this.player);
	this.player.enableBody = true;
	this.player.body.collideWorldBounds=true;

	this.player.scale.setTo(1.5, 1.5); //rescalling player

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
	this.game.camera.follow(this.player);

	// walk animation for player (key, list of frames, framerate,loop t/f
	// left= walk left, right =walk right, etc)
	this.player.animations.add('down', [0,4,8,12],10,true);
	this.player.animations.add('left', [1,5,9,13],10,true);
	this.player.animations.add('up', [2,6,10,14],10,true);
	this.player.animations.add('right', [3,7,11,15],10,true);
  },

  update: function() {
	// indicates waht enemy was ran into (or "hit")
	// when adding new enemies, create new ENEMY<enemy number>
	// FIGURE OUT HOW TO OPTIMIZE THIS CODE (passing enemyBattle parameter here?)
	this.game.physics.arcade.overlap(this.player, this.enemy1, this.enemy1Hit, null ,this);
	this.game.physics.arcade.overlap(this.player, this.enemy2, this.enemy2Hit, null ,this);
	this.game.physics.arcade.overlap(this.player, this.enemy3, this.enemy3Hit, null ,this);
	this.game.physics.arcade.overlap(this.player, this.enemy4, this.enemy4Hit, null ,this);

	// creating movement for player (she )
	// reseting velocity x and y to zero
	this.player.body.velocity.x = 0;
	this.player.body.velocity.y = 0;

	// store direction player is facing (the frame for our .stop() function)
	if (this.cursors.down.isDown) {
		this.player.body.velocity.y = this.player_Y_speed;
		this.player.animations.play('down');
		this.playerDirection = 0;
	} 
	else if (this.cursors.left.isDown) {
		this.player.body.velocity.x = -this.player_X_speed;
		this.player.animations.play('left');
		this.playerDirection = 1;
	} 
	else if (this.cursors.up.isDown) {
		this.player.body.velocity.y = -this.player_Y_speed;
		this.player.animations.play('up');
		this.playerDirection = 2;
	} 
	else if (this.cursors.right.isDown) {
		this.player.body.velocity.x = this.player_X_speed;
		this.player.animations.play('right');
		this.playerDirection = 3;
	} 
	else {
		//  when not in motion, player will stop
		this.player.animations.stop()
		this.player.frame = this.playerDirection;
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
		this.playerLocation_X
	// also telling Battle State what enemy the player will fight (only one enemy for now)
	this.game.state.start('Battle', true, false, this.enemyBattle_sprite); 
	},

  	//just some debugging info
  render: function() {
   	this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.player, 32, 500);
	}
};
