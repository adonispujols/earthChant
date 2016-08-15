var earthChant = earthChant || {}; // calling from base game
//NOTES NOTES NOTES NOTES:
// TURN INTO MINI RPG ENGINE (easily manipulable)
	// BE MORE EFFICIENT (more phaser constructors, variables, etc..)
		// USE JSON ++ PHASER'S GROUP CONSTRUCTOR (pass objects and entire properties through parameters) 
	// WRITE DOCUMENTAION ON CODE 
		// How to add/manipulate components (i.e. 'Add another enemy to scene by doing...')

//MAJOR:
// NEED TEXT NEED TEXT NEED NEED TEXT NEED TEXT!!
// NEED SOUND NEED SOUND NEED SOUND NEED SOUND!!
// UNIVERSAL HP, EXP, AND PROPER ATTACK/POTIONS (just use items that wear with each use (but can be repaired) except potions)
	// ADD RANDOMNESS/CRITICAL CHANCE TO MOVES SO BATTLES DON'T TURN OUT THE SAME(random attk+score+loot TURNS AND RUNNING SUCCESS)!
	// ADD ACTUAL LEVELS (I mean like, Lvl1, lvl2, with increasing hp and power)
		// ALSO, MAKE ENEMIES VARY IN DIFFICULTY (by type---this simplifies the game)
// SIMPLE TUTORIAL SCREEN (one screen)
// FOCUS GAME ON POLLUTION!!!
// TOO SIMILAR TO POKEMON! (keep button system)

//MINOR:
// FIX/ADD COMMENTS 
// ORGANIZE VARIABLES+FUNCTIONS
// USE BOOTSTRAP TO RESIZE SCREEN 
// MAKE ENEMIES RESCALE DEPENDING ON SPRITE
// ADD MOUSE+KEY INPUT (ON BATTLE)
// ASSESS HOW MUCH VARIABILITY IS NEEDED FOR DMG!


// setting up state
earthChant.World = function(){};

//setting up variables, functions, and objects of world
earthChant.World.prototype = {

	// 'permanently' storing variables (parameters available to all states)
	init: function(enemyDead, score) {    
    var enemyDead = enemyDead || false;      // assumes no enemies are dead if no parameters are passed from Battle.state
    this.enemyDead = enemyDead;        // assigns boolean to local var if an enemy was killed or not 
	
	// stores what enemy (by  number, i.e. enemy1=1, enemy2=2...) player was battling
    this.enemyBattle_number; 

    // permanent list of dead enemies (creates empty list if nothing set yet)
    this.deadEnemies = this.deadEnemies || [];
    
    var score = score || 0;      // assumes score is 0 if nothing was passed
    this.score = this.score || 0;     // local object of var score
    this.score += score;     //increasing world score by score gained in Battle
    //defines actions if enemy is dead
   	if (this.enemyDead){
   		this.deadEnemies.push(this.enemyBattle_number); // storing dead enemy in list
   	}

   	// current player's location on World (sets to defined value if nothing changed)
	this.playerLocation_X  = this.playerLocation_X || 1000;  // TRY PASSING THESE TWO PARAMETERS AS ONE VARIABLE/GROUP 
	this.playerLocation_Y  = this.playerLocation_Y || 1000;
	
	//boolean to control when our keys will be enabled
	this.gameStart = this.gameStart || false;  // REPEAT VAR AND || NOT NEEDED HERE
	this.keyEnabled = this.keyEnabled || false;
	this.itemPicked = this.itemPicked || false; // same but for item
	//  
	this.infoBox;
	//list of deforestation info
	this.infolist = ["Almost half of world’s timber and up \n to 70% of paper is consumed by \n Europe, United States and \n Japan alone.","25% of cancers \n fighting organisms \n are found in the amazon.","20% of the world’s oxygen \n is produced in the \n Amazon forest.","The rate of deforestation equals \n to loss of 20 football fields \n every minute."]; 
	
   },
  create: function() {
	// bounds and color of world (negatives sets bounds beyond top left)
	this.game.world.setBounds( 0, 0, 2000, 2000);
	this.game.stage.backgroundColor = '#007000';
	
	// map of world
	this.map = this.game.add.sprite(0,0,'map');

	//  DO NOT NEED TO SET UP VARIABLE FOR EACH OBJECT (apparently)
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
	this.cursors;  // arrow keys
	this.scoreText;
	//  DO NOT NEED TO SET UP VARIABLE FOR EACH OBJECT (apprently)

	// adding our sprites to game (set at playerLocation_X and Y
	this.player = this.game.add.sprite(this.playerLocation_X, this.playerLocation_Y, 'betty');

	// actuall enabling arcade physics on player var (object)
	this.game.physics.arcade.enable(this.player);
	this.player.enableBody = true;
	this.player.body.collideWorldBounds=true;


	// same for our enemy
	this.enemy1 = this.game.add.sprite(200,1200, 'smog');
	this.enemy2 = this.game.add.sprite(550,1000, 'canEnemy');
	this.enemy3 = this.game.add.sprite(900,1200, 'snake');
	this.enemy4 = this.game.add.sprite(1200,900, 'trashMan');


	// enable physics for enemies (individually for now)
	this.game.physics.arcade.enable(this.enemy1);
	this.enemy1.enableBody = true;
	this.game.physics.arcade.enable(this.enemy2);
	this.enemy2.enableBody = true;
	this.game.physics.arcade.enable(this.enemy3);
	this.enemy3.enableBody = true;
	this.game.physics.arcade.enable(this.enemy4);
	this.enemy4.enableBody = true;

	// creating basic items place holder with physics
	this.item = this.game.add.sprite(1000,900, 'tree');
	this.game.physics.arcade.enable(this.item);
	this.item.enableBody = true;

	// rescalling sprites
	this.player.scale.setTo(1, 1); 
	this.map.scale.setTo(2,2);
	// this.enemy2.scale.setTo(2,2); 

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

	// display score
	this.scoreText = this.game.add.text(1000, 1000, 'Score ' + this.score);
    this.scoreText.anchor.set(0.5);   // sets text to center
    this.scoreText.fixedToCamera = true;  // fixes score to camera (like a ui)
    this.scoreText.cameraOffset.setTo(1000,100);   // moves score text
    
    // cursor controls (arrow keys)
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
	// creates infoBox (facts)
	this.create_infoBox();
	
    // creates info screen 
	this.infoScreen();
	
	// adds a delay before input can be taken
	this.game.time.events.add(Phaser.Timer.SECOND*2, this.enableKeys, this);
	

	// camera follow character (As easy as that!)
	this.game.camera.follow(this.player);

	// walk animation for player (key, list of frames, framerate,loop t/f
	// left= walk left, right =walk right, etc)
	this.player.animations.add('stop',[0], true);
	this.player.animations.add('down', [0,4,8,12],10,true);
	this.player.animations.add('left', [1,5,9,13],10,true);
	this.player.animations.add('up', [2,6,10,14],10,true);
	this.player.animations.add('right', [3,7,11,15],10,true);
  },

  update: function() {
	// indicates waht enemy was ran into (or "hit")
	// when adding new enemies, create new ENEMY<enemy number>
	this.game.physics.arcade.overlap(this.player, this.enemy1, this.enemy1Hit, null ,this); // FIGURE OUT HOW TO OPTIMIZE THIS CODE (passing enemyBattle parameter here?)
	this.game.physics.arcade.overlap(this.player, this.enemy2, this.enemy2Hit, null ,this);
	this.game.physics.arcade.overlap(this.player, this.enemy3, this.enemy3Hit, null ,this);
	this.game.physics.arcade.overlap(this.player, this.enemy4, this.enemy4Hit, null ,this);
	// when character is over item, "collect" it
	this.game.physics.arcade.overlap(this.player, this.item, this.collectItem, null ,this);  // FIGURE OUT HOW TO OPTIMIZE THIS CODE (passing enemyBattle parameter here?)


	// creating movement for player (she )
	// reseting velocity x and y to zero
	this.player.body.velocity.x = 0;
	this.player.body.velocity.y = 0;
	
	// store direction player is facing (the frame for our .stop() function)
	// only does this if key is enabled
	if (this.keyEnabled || this.itemPicked){
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
			this.player.animations.stop();
			this.player.frame = this.playerDirection;
		}
	}
  	},
  	// creates info screen at beginning of game
  	infoScreen: function(){
  		if(!this.gameStart){
  			this.info = this.game.add.text(this.player.x, this.player.y, "Defeat as many enemies as Possible!");  // TRY ADDING AN IMAGE OR SO
  			this.info.anchor.set(0.5);  // sets text at center 
  		}
  	},

  	create_infoBox: function(){
  		this.randInfo = this.game.rnd.integerInRange(0,this.infolist.length); //chooses random index from list using Phaser's randomint generator
  		this.infoBox = this.game.add.text(1000, 1000, 
  		this.infolist[this.randInfo]);
  	    this.infoBox.anchor.set(0.5);   // places infoBox at center
  	    //displays new info after set interval
  	    this.infoBox.fixedToCamera = true;  // fixes score to camera (like a ui)
  	    this.infoBox.cameraOffset.setTo(600,100);   // moves score text
  		this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.show_infoBox, this); //*2 increases amount of seconds
  	},

  	// displays new info (after some time)
  	show_infoBox: function(){
  		this.randInfo = Math.floor(Math.random() * (this.infolist.length)); //chooses random index from list
  		this.infoBox.setText(this.infolist[this.randInfo]);
  	},
  	
  	// hides the info box
  	hideInfo: function(){
  		this.info.kill();
  		this.playerDirection = 0;
  		this.itemPicked = true;
  	},
  	// enables input
  	enableKeys: function (){  
  		this.gameStart= true;
		this.keyEnabled = true;
		this.info.kill();
	},

  	// define what sprite to load in battle when corresponding enemy is ran into
  	enemy1Hit: function(){    	// REPETITIVE. SIMPLIFIY CODE (use json or similar)
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

  	// player "collects" item (removes it from game)
  	collectItem: function(){
  		this.player.animations.play('stop');
  		this.item.kill();
  		this.keyEnabled = false;
  		this.info = this.game.add.text(this.player.x, this.player.y+50, "Info Teext");  // TRY ADDING AN IMAGE OR SO
  		this.info.anchor.set(0.5);  // sets text at center 
  		this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.hideInfo, this); //*2 increases amount of seconds
  	},
  

	// loading battle scene (state name, reset world t/f, reset cache t/f)
	loadBattle: function() {
	// storing player's location before switching states
	this.playerLocation_X = this.player.x;
	this.playerLocation_Y = this.player.y;
	
	// also telling Battle State what enemy the player will fight (only one enemy for now)
	this.game.state.start('Battle', true, false, this.enemyBattle_sprite); 
	},

  	//just some debugging info
  render: function() {
   	this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.player, 32, 500);
	}
};
