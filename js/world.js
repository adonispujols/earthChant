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
	
	// stores what enemy (by number, i.e. enemy1=1, enemy2=2...) player was battling
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

   	// stores collected items in list
   	this.itemNumber;
   	this.itemsCollected = this.itemsCollected || [];

   	// current player's location o

   	 // player location in World (sets to defined value if nothing changed)
	this.playerLocation_X  = this.playerLocation_X || 425;  // TRY PASSING THESE TWO PARAMETERS AS ONE VARIABLE/GROUP 
	this.playerLocation_Y  = this.playerLocation_Y || 200;
	
	// facts
	this.infoBox;
	//list of deforestation info
	this.infolist = ["Almost half of world’s timber and up to 70% of paper is consumed by \n Europe, United States and Japan alone.","25% of cancers fighting organisms \n are found in the amazon.","20% of the world’s oxygen \n is produced in the \n Amazon forest.","The rate of deforestation equals \n to loss of 20 football fields every minute."]; 
   },
  create: function() {
	// bounds and color of world (negatives sets bounds beyond top left)
	this.game.world.setBounds(0, 0, 980, 890);
	this.game.stage.backgroundColor = '#808080';

	// map of world
	this.map = this.game.add.sprite(0,0,'map');

	// rudimentary collision boxes (col1= collison box 1)
	this.col1 = this.game.add.sprite(280,120,'placeHolder');  //EXTREMELY INEFFICIENT. CAN YOU ATLEAST USE GROuP COLLISION
	this.col1.scale.setTo(.60,.03);
	this.game.physics.arcade.enable(this.col1);
	this.col1.enableBody = true;
	this.col1.body.immovable = true;
	// this.col1.visible=false;
	this.col2 = this.game.add.sprite(280,142,'placeHolder');  //EXTREMELY INEFFICIENT. CAN YOU ATLEAST USE GROuP COLLISION
	this.col2.scale.setTo(.065,.75);
	this.game.physics.arcade.enable(this.col2);
	this.col2.enableBody = true;
	this.col2.body.immovable = true;
	// this.col1.visible=false;
	this.col3 = this.game.add.sprite(546,127,'placeHolder');  //EXTREMELY INEFFICIENT. CAN YOU ATLEAST USE GROuP COLLISION
	this.col3.scale.setTo(.07,.78);
	this.game.physics.arcade.enable(this.col3);
	this.col3.enableBody = true;
	this.col3.body.immovable = true;
	// this.col1.visible=false4
	this.col4 = this.game.add.sprite(315,400,'placeHolder');  //EXTREMELY INEFFICIENT. CAN YOU ATLEAST USE GROuP COLLISION
	this.col4.scale.setTo(.15,.06);
	this.game.physics.arcade.enable(this.col4);
	this.col4.enableBody = true;
	this.col4.body.immovable = true;
	// this.col1.visible=false;
	this.col5 = this.game.add.sprite(450,400,'placeHolder');  //EXTREMELY INEFFICIENT. CAN YOU ATLEAST USE GROuP COLLISION
	this.col5.scale.setTo(.2,.05);
	this.game.physics.arcade.enable(this.col5);
	this.col5.enableBody = true;
	this.col5.body.immovable = true;
	// this.col1.visible=false;

	//  DO NOT NEED TO SET UP VARIABLE FOR EACH OBJECT (apparently)
	// setting up variables for objects
	this.player;
	this.player_X_speed = 300;
	this.player_Y_speed = 300;
	this.playerDirection = 0;  //resets direction she faces when game starts
	this.enemy1;           //our enemies
	this.enemy2;
	this.enemy3;
	this.enemy4;
	this.enemyBattle_sprite;     // stores sprite of enemy player ran into (look at loadBattle)
	this.infoImage;   //sores the info image to display
	this.cursors;  // arrow keys
	this.scoreText;
	this.infoText = '';  // setting up infotext var as string
	this.transitionSpeed = 2; //setting speed of transitions between facts box
	//  DO NOT NEED TO SET UP VARIABLE FOR EACH OBJECT (apprently)

	// adding our sprites to game (set at playerLocation_X and Y
	this.player = this.game.add.sprite(this.playerLocation_X, this.playerLocation_Y, 'betty');

	// actuall enabling arcade physics on player var (object)
	this.game.physics.arcade.enable(this.player);
	this.player.enableBody = true;
	this.player.body.collideWorldBounds=true;


	// same for our enemy
	this.enemy1 = this.game.add.sprite(800,200, 'Poisonous Smog');
	this.enemy2 = this.game.add.sprite(390,400, 'Evil Tin Can');
	this.enemy3 = this.game.add.sprite(500,500, 'Vile Plastic Bottle');
	this.enemy4 = this.game.add.sprite(650,300, 'Dirty Trash Man');


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
	this.item = this.game.add.sprite(400,600, 'Sprout');
	this.game.physics.arcade.enable(this.item);
	this.item.enableBody = true;

	// rescalling sprites
	this.player.scale.setTo(1, 1); 
	this.map.scale.setTo(2, 2);
	this.enemy1.scale.setTo(.1, .1); 
	this.enemy2.scale.setTo(.3, .3); 
	this.enemy3.scale.setTo(.2, .2); 
	this.enemy4.scale.setTo(.2, .2); 
	this.item.scale.setTo(.17, .17); 


	// cycles through the living state of each enemy and kills what is dead
	for (var i = 0; i < this.deadEnemies.length; i++) { 
		if (this.deadEnemies[i] == 1){ 	// TRY TO NOT DRAW SPRITES IN FIRST PLACE IF DEAD
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

	// cycles through the collected state of each item
	for (var i = 0; i < this.itemsCollected.length; i++) { 
		if (this.itemsCollected[i] == 1){ 	// TRY TO NOT DRAW SPRITES IN FIRST PLACE IF DEAD
	    	this.item.kill();
    	}
    }

	// display score
	this.scoreText = this.game.add.text(0, 0, 'Score:  ' + this.score, {fill:'red',font:'impact',fontSize:'60px'});
    this.scoreText.anchor.set(0.5);   // sets text to center
    this.scoreText.fixedToCamera = true;  // fixes score to camera (like a ui)
    this.scoreText.cameraOffset.setTo(this.game.width/2-70,50);   // moves score text

    // cursor controls (arrow keys)
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
	// boolean to control when our keys will be enabled
	this.keyEnabled = true;
	
	// creates infoBox (facts)
	this.create_infoBox();
	
	// camera follow character (As easy as that!)
	this.game.camera.follow(this.player);

	// walk animation for player (key, list of frames, framerate,loop t/f
	// left= walk left, right = walk right, etc)
	this.player.animations.add('stop',[0], true);
	this.player.animations.add('down', [0,4,8,12],10,true);
	this.player.animations.add('left', [1,5,9,13],10,true);
	this.player.animations.add('up', [2,6,10,14],10,true);
	this.player.animations.add('right', [3,7,11,15],10,true);
  },

  update: function() {
  	// collision with invisible boxes
	this.game.physics.arcade.collide(this.player, this.col1, null); 
	this.game.physics.arcade.collide(this.player, this.col2, null); 
	this.game.physics.arcade.collide(this.player, this.col3, null); 
	this.game.physics.arcade.collide(this.player, this.col4, null); 
	this.game.physics.arcade.collide(this.player, this.col5, null); 


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
	if (this.keyEnabled){
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
  	// creates our 'info box' or text above game with facts
  	create_infoBox: function(){
  		this.randInfo = this.game.rnd.integerInRange(0,this.infolist.length); //chooses random index from list using Phaser's randomint generator
  		this.infoBox = this.game.add.text(1000, 1000, 
  		'Did you Know?\n' + this.infolist[this.randInfo]);
  	    this.infoBox.anchor.set(0.5);   // places infoBox at center
  	    //displays new info after set interval
  	    this.infoBox.fixedToCamera = true;  // fixes score to camera (like a ui)
  	    this.infoBox.cameraOffset.setTo(600,100);   // moves score text
  		this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.show_infoBox, this); //*2 increases amount of seconds
  	},

  	// displays new info (after some time)
  	show_infoBox: function(){
  		this.randInfo = Math.floor(Math.random() * (this.infolist.length)); //chooses random index from list
  		this.infoBox.setText('Did you Know?\n' + this.infolist[this.randInfo]);
  	},
  	// displays "fact box"/ box with info when item/enemy ran into
  	factBox: function(){
  		// button that will hide display
  		this.closeFactButton = this.game.add.button(this.player.x, this.player.y,'buttons', 
  				this.hideInfo,this, 2, 1, 0);
  		this.closeFactButton.scale.setTo(1, 0.5);
		this.closeFactButton.anchor.set(0.5);  // sets anchor at center
  		
  		// displays info about item
  		this.info = this.game.add.text(this.closeFactButton.x, this.closeFactButton.y, this.infoText);  // TRY ADDING AN IMAGE OR SO
  		this.info.anchor.set(0.5);  // sets text at center
  		
  	},
  		
  	// hides the info box
  	hideInfo: function(){
  		this.info.kill();
  		this.closeFactButton.kill();
  		this.playerDirection = 0;
  		this.keyEnabled = true;
  	},
  	// enables input
  	enableKeys: function (){
		this.keyEnabled = true;
	},

  	// define what sprite to load in battle when corresponding enemy is ran into
  	enemy1Hit: function(){    	// REPETITIVE. SIMPLIFIY CODE (use json or similar)
  		// sends info about enemy to battle state
  		this.infoText='Inhaling air pollution takes away at least 1-2 years of a typical human life.';		// defines what text will display when fighting with enemy
 		this.enemyBattle_sprite = 'Poisonous Smog';  // tells Battle.state the key name of sprite
  		this.enemyBattle_number = 1;  // tells Battle.state the enemy number
  		this.infoImage = 'airPollution'
  		this.loadBattle();
  	},
  	
  	enemy2Hit: function(){
  		this.infoText='Tin cans are known to cause a great deal of harm to aquatic \n ecosystemssuch as fungi, algae and phytoplankton.';
  		this.enemyBattle_sprite = 'Evil Tin Can';
  		this.enemyBattle_number = 2;
  		this.infoImage = 'tinCan'; 
  		this.loadBattle();
  	},

  	enemy3Hit: function(){
  		this.infoText='Plastic bags and other plastic garbage thrown into the ocean \n    kill as many as 1 million sea creatures every year.';
  		this.enemyBattle_sprite = 'Vile Plastic Bottle';
  		this.enemyBattle_number = 3; 
  		this.infoImage = 'turtle';
  		this.loadBattle();  	
  	},

  	enemy4Hit: function(){
  		this.infoText='Every American equates to at least 100 tons of garbage a year';
  		this.enemyBattle_sprite = 'Dirty Trash Man';
  		this.enemyBattle_number = 4; 
  		this.infoImage = 'landFill';
  		this.loadBattle();  	
  	},

  	// player "collects" item (removes it from game)
  	collectItem: function(){
  		this.player.animations.play('stop');
  		this.item.kill();  //removes item
  		this.keyEnabled = false;  //disables keys
  		
  		// adds collected item to list 
  		this.itemNumber = 1;
  		this.itemsCollected.push(this.itemNumber);

  		// increases score a little 
  		this.score += 50;
  		this.scoreText.setText('Score ' + this.score);
  		
  		// insert whaterver you want to display when item is picked
  		// sprite?
  		this.infoText= "Info about Item"; // defining text to display
  		this.factBox();
  	},
  

	// loading battle scene (state name, reset world t/f, reset cache t/f)
	loadBattle: function() {
	// storing player's location before switching states
	this.playerLocation_X = this.player.x;
	this.playerLocation_Y = this.player.y;
	
	// also telling Battle State what enemy the player will fight (only one enemy for now)
	this.game.state.start('Battle', true, false, this.enemyBattle_sprite, this.infoText, this.infoImage); 
	},

  	//just some debugging info
  render: function() {
   	this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.player, 32, 500);
	}
};
