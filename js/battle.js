var earthChant = earthChant || {}; // calling from base game
//NOTES NOTES NOTES NOTES:
// FOR REUSE (essential components of (turn based)RPG game):
// TURN INTO MINI (turn based) RPG ENGINE (easily manipulable)
	// BE MORE EFFICIENT (more phaser constructors, variables, etc..)
		// USE JSON ++ PHASER'S GROUP CONSTRUCTOR (pass objects and entire properties through parameters) 
	// WRITE DOCUMENTAION ON CODE 
		// How to add/manipulate components (i.e. 'Add another enemy to scene by doing...')
	// UNIVERSAL PLAYER HP, EXP, etc.. (char properties) 
	// NEED TEXT NEED TEXT NEED NEED TEXT NEED TEXT!!
	// NEED SOUND NEED SOUND NEED SOUND NEED SOUND!!
	// NEED ITEMS TOO! (weapons, potions, etc...)
		// ADD RANDOMNESS TO MOVES/TURNS SO BATTLES DON'T TURN OUT HTE SAME!
			// MAKE ENEMIES VARY IN DIFFICULTY

//MAJOR (for earthChant):
// FOCUS GAME ON POLLUTION!!!
// TOO SIMILAR TO POKEMON! (keep button system)

//MINOR:
// FIX/ADD COMMENTS 
// ORGANIZE VARIABLES+FUNCTIONS
// USE BOOTSTRAP TO RESIZE SCREEN 
// MAKE ENEMIES RESCALE DEPENDING ON SPRITE
// DON'T DRAW STUFF JUST TO DELETE LATER (i.e makign a sprite that will be killed right after)
// ADD MOUSE+KEY INPUT (ON BATTLE)
// SIMPLE TUTORIAL SCREEN (one screen)


// more amazing art:
// http://opengameart.org/content/anime-portrait-for-lpc-characters
// http://opengameart.org/content/lots-of-free-2d-tiles-and-sprites-by-hyptosis
// setting up state
earthChant.Battle = function(){};

earthChant.Battle.prototype = {
	//setting up global (across game) variables (sending parameters to state)
	// loads the specific enemy(s) encountered (defined in World.state)
	init: function(enemyBattle_sprite, infoText){
    var enemyBattle_sprite = enemyBattle_sprite || null;  // enemy's sprite
    this.enemyBattle_sprite = enemyBattle_sprite;    //creates local variable from World's variable value
   	
   	// loads potionsStored, or sets to default if nothing 
//   	var potionsStored = potionsStored || [0,0,0];  //[basic, medium,stronger]
//   	this.potionsStored = potionsStored;
//   	
   	//drawing infoText about enemy from world
   	var infoText = infoText || '';
   	this.infoText = infoText;
//   infoImage
   },
   


//setting vars, functions, and objects
// Almost Every object, var, and function needs 'this' because it attaches it to our main game(stores in cache it)
create: function(){
	this.game.stage.backgroundColor = '#007000';

	//  DO NOT NEED TO SET UP VARIABLE FOR EACH OBJECT (apprently)
	// you can manipulate a lot of properties from here
	this.atkanim;  	// attack animation (anim2 or hitanim2 are for enemy (as of now))
	this.atkanim2;
	this.healanim;    // heal (health gained) animation  
	this.hitanim;    // hit (or hurt) animation 
	this.hitanim2;
	this.deadPlayer;   // for dead player sprite
	this.deadEnemy;
	this.nullanim; 		// use this null animation to debug
	this.randomScale_min = 1; //sets the min/max of how random/varialbe the attack power of moves will be (i.e. the multiplier)
	this.randomScale_max = 5;   
	this.power; 			// var that controls power of attacks (changes depending on attack chosen)
	this.attackPower = 6;  //specifices the exact power stat of attack (should be put in seperate list)
	this.attackPower2 = 6;
	this.potionRegen = 30;     //amount of health gained 
	this.enemyDelayTime = .75;  // amount of seconds between enemy hti and attack animations
	this.player;
	this.playerGroup;
	this.player_X = 820;  // starting x/y coords of player
	this.player_Y = 220;
	this.enemy;
	this.enemyDead = false; 
	this.enemyGroup; 
	this.enemy_X = 130;  // starting x/y coords of enemies
	this.enemy_Y = 120;
	this.score = 0;     
	this.dialogBox;    //i.e. blue background box
	this.victoryBox;
	this.deadBox;
	this.deadBox;
	this.infoBox;
	//list of deforestation info
	this.infolist = ["Almost half of world’s timber and up \n to 70% of paper is consumed by \n Europe, United States and \n Japan alone.","25% of cancers \n fighting organisms \n are found in the amazon.","20% of the world’s oxygen \n is produced in the \n Amazon forest.","The rate of deforestation equals \n to loss of 20 football fields \n every minute."]; 
	this.mainMenu; 	// SHOULD FOCUS MORE ON POLLUTION NOW!!!
	this.attackOptions;
	this.backButton;
	this.backButton_X = 60; // x coor
	this.baseButton_1_X = 260;   // xcoord of base (frequently used) buttons
	this.baseButton_2_X = 595;  // when adding a commonly used button with different X or Y, add baseButton_(x)_X or Y
	this.baseButton_3_X = 930;
	this.baseButton_Y = 430;   // all buttons are based off of same y coord
	this.attack_style = {fill:'red',font:'impact',fontSize:'45px'}; // default style of each option's texxt
	this.potions_style = {fill:'green',font:'impact',fontSize:'45px'}; // default style of each option's texxt
	this.text_Y =450;     // set text y coord
	this.battleStart = false; // boolean for initial info display 
	this.transitionSpeed = 2; //setting speed of transitions between facts box
	//  DO NOT NEED TO SET UP VARIABLE FOR EACH OBJECT (apprently)


	// adding (displaying) our sprites to the game
	this.player = this.game.add.sprite(this.player_X, this.player_Y,'betty');
	this.enemy = this.game.add.sprite(this.enemy_X, this.enemy_Y, this.enemyBattle_sprite);
	this.dialogBox = this.game.add.sprite(0, 400, 'dialogBox');

	// creaitng players group
	this.playerGroup = this.game.add.group();
	this.playerGroup.add(this.player);
	// creating enemies group
	this.enemyGroup = this.game.add.group(); 
	this.enemyGroup.add(this.enemy);
	
	// rescaling sprites
	this.dialogBox.scale.setTo(3,2);
	// SHOULD RESCALE DEPENDING ON ENEMY FIGHTING
	this.enemy.scale.setTo(.7,.7);
	this.player.scale.setTo(3,3);
	

	// setting health values
	this.player.maxHealth = 50;
	this.player.health = 50;
	this.enemy.maxHealth = 50;
	this.enemy.health = 50;

	// setting up our animation sequences (key, frames, frame rate, loop)
	this.atkanim = this.player.animations.add('spin',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],15,false); // defining animation frames here for now
	this.hitanim = this.player.animations.add('spin2',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],25,false); 
	this.healanim = this.player.animations.add('spin3',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],25,false); 
	this.atkanim2 = this.enemy.animations.add('spin4',[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],15,false); 
	this.hitanim2 = this.enemy.animations.add('spin5',[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],25,false); 
	this.nullanim = this.enemy.animations.add('null',[0],1,false); 
	
	// creating and customizing our healthbars
	// player health bar
	this.playerBarConfig = {
    width: this.player.maxHealth*5,
    height: 40,
    x: this.player.x,
    y: 100,
    bg: {    // bar's background color
      color: '#651828'
    },
    bar: {  //actual bar color (animated)
      color: '#04C404'
    },
    animationDuration: 200,  // set how fast bar increases/decreases
    flipped: false
  	};
	this.playerHealthBar = new HealthBar(this.game, this.playerBarConfig);

	// enemy health bar
	this.enemyBarConfig = {
    width: this.enemy.maxHealth*5,
    height: 40,
    x: this.enemy.x+150,
    y: 100,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#04C404'
    },
    animationDuration: 200,
    flipped: false
  	};
	this.enemyHealthBar = new HealthBar(this.game, this.enemyBarConfig);
	
	// creating groups for options (good for easy manipulation)
	this.mainMenu = this.game.add.group(); 
	this.attackOptions = this.game.add.group();
	this.potionsOptions = this.game.add.group();
	this.backButton = this.game.add.group();
	
	// (interactive) buttons for inital/main options
	// also adds adjacent text
	this.attackButton = this.game.add.button( this.baseButton_1_X, this.baseButton_Y,'buttons', 
			this.showAttackMenu,this, 2, 1, 0); // attack button (2 = frame when over, 1 = frame when out, 0 = frame when pressed)
	this.attackButtonText = this.game.add.text(this.attackButton.x, this.text_Y, 
	"ATTACK", this.attack_style);

	this.PotionsButton = this.game.add.button( this.baseButton_2_X, this.baseButton_Y,'buttons', 
			this.showpotionsOptions,this, 2, 1, 0); // Potions button
	this.PotionsButtonText = this.game.add.text(this.PotionsButton.x, this.text_Y, 
	"POTIONS", this.potions_style);

	this.runButton = this.game.add.button( this.baseButton_3_X, this.baseButton_Y, 'buttons', 
	this.runClicked,this, 2, 1, 0); // run button
	this.runButtonText = this.game.add.text(this.runButton.x, this.text_Y, 
	"FLEE", {fill:'yellow',font:'impact',fontSize:'45px'});

	// adding buttons and text to main Menu group
	this.mainMenu.add(this.attackButton);  // MAKE TEXT CHILD TO CORRESPONDING BUTTON
	this.mainMenu.add(this.PotionsButton);
	this.mainMenu.add(this.runButton);	
	this.mainMenu.add(this.attackButtonText);
	this.mainMenu.add(this.PotionsButtonText);
	this.mainMenu.add(this.runButtonText)
	this.mainMenu.setAll('anchor.x', 0.5);  // sets all children at center
	this.mainMenu.setAll('scale.x', 1.5);  // rescales chidlren
	this.mainMenu.setAll('scale.y', 1.5);  // rescales chidlren
	
	// buttons for different attack options
	this.attack = this.game.add.button(this.baseButton_1_X, this.baseButton_Y, 'buttons', 
			this.attackClicked,this, 5, 4, 3); // attack button
	this.attackText = this.game.add.text(this.attack.x, this.text_Y, 
	"ATTACK", this.attack_style);

	this.attack1 = this.game.add.button( this.baseButton_2_X, this.baseButton_Y, 'buttons', 
			this.showAttackMenu,this, 5, 4, 3); // attack1 button
	this.attack1Text = this.game.add.text(this.attack1.x, this.text_Y, 
	"ATTACK 1", this.attack_style);

	this.attack2 = this.game.add.button( this.baseButton_3_X, this.baseButton_Y, 'buttons', 
			this.showAttackMenu,this, 5, 4, 3); // attack2 button
	this.attack2Text = this.game.add.text(this.attack2.x, this.text_Y, 
	"ATTACK 2", this.attack_style);
	// adding options to group
	this.attackOptions.add(this.attack);
	this.attackOptions.add(this.attack1);
	this.attackOptions.add(this.attack2);
	this.attackOptions.add(this.attackText);
	this.attackOptions.add(this.attack1Text);
	this.attackOptions.add(this.attack2Text);
	this.attackOptions.setAll('anchor.x', 0.5);  // sets all children at center
	this.attackOptions.setAll('scale.x', 1.5);  // rescales chidlren
	this.attackOptions.setAll('scale.y', 1.5);  // rescales chidlren
	
	// buttons for different Potions options
	this.potion = this.game.add.button( this.baseButton_1_X, this.baseButton_Y, 'buttons', 
			this.potionClicked,this, 8, 7, 6); // potion2 button
	this.potionText = this.game.add.text(this.potion.x, this.text_Y, 
	"POTIONS", this.potions_style);
	
	this.potion1 = this.game.add.button( this.baseButton_2_X, this.baseButton_Y, 'buttons', 
			this.potion1Clicked,this, 8, 7, 6); // potion1 button
	this.potion1Text = this.game.add.text(this.potion1.x, this.text_Y, 
	"POTIONS 1", this.potions_style);
	
	this.potion2 = this.game.add.button( this.baseButton_3_X, this.baseButton_Y, 'buttons',
			this.showpotionsOptions,this, 8, 7, 6); // potion2 button
	this.potion2Text = this.game.add.text(this.potion2.x, this.text_Y,
	"POTIONS 2", this.potions_style);

	this.potionsOptions.add(this.potion);
	this.potionsOptions.add(this.potion1);
	this.potionsOptions.add(this.potion2);
	this.potionsOptions.add(this.potionText);
	this.potionsOptions.add(this.potion1Text);
	this.potionsOptions.add(this.potion2Text);
	this.potionsOptions.setAll('anchor.x', 0.5);  // sets all children at center
	this.potionsOptions.setAll('scale.x', 1.5);  // rescales chidlren
	this.potionsOptions.setAll('scale.y', 1.5);  // rescales chidlren
	

	// back button that returns to main screen
	this.back = this.game.add.button(this.backButton_X, this.baseButton_Y-25, 'buttons',
			this.showMainMenu,this, 1, 0, 2); 
	this.backText = this.game.add.text(this.back.x, this.back.y+10, 
	"B\nA\nC\nK", {fill:'black',font:'impact',fontSize:'33px'});

	this.backButton.add(this.back);
	this.backButton.add(this.backText);
	this.back.scale.setTo(.3,2.2);  // rescales back
	this.backButton.setAll('anchor.x', 0.5);  // sets all children at center

	//only dispalys these items if thy are in player's inventory
	// if this.potionsStored      // MAKE SO THAT THESE AREN'T DRAWN AT ALL UNLESS PLAYER HAS IT
	
	// inital fact display (then shows main menu)
	this.factBox();

},
// displays facts about enemy
factBox: function(){
	this.hideHud();  //hides huds
	
	// displaying fact related to enemy
	this.info = this.game.add.text(500, 300, this.infoText);  // TRY ADDING AN IMAGE OR SO
	this.info.anchor.set(0.5);  // sets text at center 
	this.hideInfoButton = this.game.add.button( 500, 500,'buttons', 
		this.hideInfo,this, 2, 1, 0);  // reates button hiding fact 
	
},

//hides the fact box then shows info box and main menu options
hideInfo: function(){
	this.info.kill();   // hides facts
	this.hideInfoButton.kill();
	//	showing items
	this.showMainMenu();
	// creates infoBox (facts)
	this.create_infoBox();
},

create_infoBox: function(){
	this.randInfo = this.game.rnd.integerInRange(0,this.infolist.length); //chooses random index from list using Phaser's randomint generator
	this.infoBox = this.game.add.text(this.game.world.width/3, 100, 
	this.infolist[this.randInfo]);
    this.infoBox.anchor.set(0.5);   // places infoBox at center
    //displays new info after set interval
	this.game.time.events.loop(Phaser.Timer.SECOND * 4, this.show_infoBox, this); //*2 increases amount of seconds
},

// displays new info (after some time)
show_infoBox: function(){
	this.randInfo = Math.floor(Math.random() * (this.infolist.length)); //chooses random index from list
	this.infoBox.setText(this.infolist[this.randInfo]);
},

// clicking displays next set of options (subMenu)
// for example, showAttackMenu() shows 3 attack options ontop of hud
showAttackMenu: function(){
	// show attackOptions and back button wile hiding mainMenu
	this.attackOptions.visible = true;
	this.showSubMenu();
}, 

	attackClicked: function(){
		this.hideHud();
		this.power = (this.attackPower*this.game.rnd.integerInRange(this.randomScale_min, this.randomScale_max));   //sets power of attack according to power of move * random multipler
		this.atkanim.play();         //plays animation
		//should add an conditional (if hit)
		this.atkanim.onComplete.add(this.hitEnemy, this); //when atkanim is finished run hitEnemy function
	},

//Potions button
showpotionsOptions: function(){
	this.potionsOptions.visible = true;
	this.showSubMenu();
},

	//potions button
	potionClicked: function() {
		this.hideHud();
		// should set regen to potion stat
		this.healanim.play();   //play heal animation
		this.healanim.onComplete.add(this.healPlayer, this);
	},

	//potions button
	potion1Clicked: function() {
		this.hideHud();
		// should set regen to potion stat
		this.healanim.play();   //play heal animation
		this.healanim.onComplete.add(this.healPlayer, this);
	},

// shows item submenu, hides mainmenu
showSubMenu: function(){
	this.mainMenu.visible = false;
	this.backButton.visible = true;
},

//shows mainhud/menu while hiding all submenus
showMainMenu: function(){
	this.attackOptions.visible = false;
	this.potionsOptions.visible = false;
	this.backButton.visible = false;
	this.mainMenu.visible = true;
	this.attackButton.frame = 1;  // fixed buttons are stuck at frame 2 bug (previous frame not reseting) by reseting frames
	this.PotionsButton.frame = 1;
},

// hides all options (used after actions are done);
hideHud: function(){
	this.mainMenu.visible = false;
	this.attackOptions.visible = false;
	this.potionsOptions.visible = false;
	this.backButton.visible = false;
},

// heals player and switches to enemy turn
healPlayer: function(){
	this.nullanim.play();    //trying to fix scope error / setpercent not defined bug
	this.player.heal(this.potionRegen);
	// health bar adjusts to percentage of health left
	this.playerHealthBar.setPercent(100*this.player.health/this.player.maxHealth);
	this.nullanim.onComplete.add(this.delayEnemyTurn, this); // SCOPE ERROR: OLD BUG (before I had a new anim to use with .onComp(function,this)) fixed infinite loop bug (using new .onComplete while the first .onComplete's function is running) by using first sprite.onComplete)
},

//deals damage to enemy when hit and switches to enemy turn
hitEnemy: function(){  
	this.hitanim2.play(); 
	this.enemy.damage(this.power);
	// health bar adjusts to percentage of health left
	this.enemyHealthBar.setPercent(100*this.enemy.health/this.enemy.maxHealth);
	//when all enemes die, play enemiesDead(), or else run delayEnemyTurn
	if (this.enemyGroup.countLiving()==0){ 
		this.enemiesDead();
	}
	else{
	this.hitanim2.onComplete.add(this.delayEnemyTurn, this); // SCOPE ERROR: OLD BUG (before I had a new anim to use with .onComp(function,this)) fixed infinite loop bug (using new .onComplete while the first .onComplete's function is running) by using first sprite.onComplete)
	}
},

//add a slight delay before enemy does anything
delayEnemyTurn: function(){
	this.game.time.events.add(Phaser.Timer.SECOND*this.enemyDelayTime, this.enemyTurn, this);
},

// defines what enemy does in their turn (very basic ai here, they literally just attack)
enemyTurn: function(){
	this.atkanim2.play();  
	this.power = (this.attackPower2*this.game.rnd.integerInRange(this.randomScale_min, this.randomScale_max));    //still using same power formula 
	//again, add an conditional (if hit)
	this.atkanim2.onComplete.add(this.hitPlayer, this); 
},

// deals damage to player when hit and switches to player turn
hitPlayer: function(){
	this.hitanim.play();
	this.player.damage(this.power);
	this.playerHealthBar.setPercent(100*this.player.health/this.player.maxHealth);
	//when all players die, play playersDead(), or else run playerTurn
	if (this.playerGroup.countLiving()==0){
		//add "dead player" sprite 
		this.playersDead();
	}
	else{
		this.playerTurn();   // play player turn
	}
},

// shows options again
playerTurn: function(){
	this.showMainMenu();
},

// defines what happens when players are all dead (right before sending to worldscreen)
playersDead: function(){
	//shows image of dead player
//	this.deadPlayer = this.game.add.sprite(this.player_X,this.player_Y,'deadPlayer');
	
	// essenially the death screeen
	this.gameOver = this.game.add.sprite(0,0, 'gameOver');
	this.gameOver.scale.setTo(1.5,1.5);
//	this.deadBox = this.game.add.text(this.game.world.width/2, 225, 
//	"You lost!");
//    this.deadBox.anchor.set(0.5); 
    
    //should go to gameover screen/ function
	this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.deathScreen, this);

},

// defines what happens when enemies are all dead (right before sending to worldscreen)
enemiesDead: function(){
	this.enemyDead = true;  // this will be passed to world's init
	//shows image of dead enemy
	this.deadEnemy = this.game.add.sprite(this.enemy_X,this.enemy_Y,'deadEnemy');
	
	this.victoryBox = this.game.add.text(this.game.world.width/2, 225, 
	"You won!");
    this.victoryBox.anchor.set(0.5); 
    //increases score by a hundred 
    this.score += 100; 
    //displays new info after set interval (* Seconds)
	this.game.time.events.loop(Phaser.Timer.SECOND* 2, this.returnToWorld, this);
},

// returns character to world and tells world living state of enemies (passes parameters to init)
returnToWorld: function(){
	this.game.state.start('World', true, false, this.enemyDead, this.score);  // SHOULD MAKE THIS A LIST
},

// creates to deathscreen
//deathScreen: function(){
//	this.game.state.start('StartScreen', true, false);  // SHOULD MAKE THIS A LIST
//
//},

runClicked: function(){
	// loading world scene (state name, world t/f, reset cache t/f)
	this.game.state.start('World', true, false); 
}
};
