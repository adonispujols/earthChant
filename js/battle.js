var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload: preload, 
create: create, update: update});
//FIX COMMENTS
//FIX COMMENTS

// more amazing art:
// http://opengameart.org/content/anime-portrait-for-lpc-characters
function preload(){
	game.stage.backgroundColor = '#007000';

	// loading sprite sheet. key, url, width, hieght, frames
	game.load.spritesheet('betty', 'assets/betty.png', 48, 48, 16);
	game.load.spritesheet('betty2', 'assets/betty.png', 48, 48, 16);
	game.load.spritesheet('fightButton','assets/button_sprite_sheet.png',193, 71);
	game.load.spritesheet('itemsButton','assets/button_sprite_sheet.png',193, 71);
	game.load.spritesheet('runButton','assets/button_sprite_sheet.png',193, 71);
	game.load.spritesheet('backButton','assets/button_sprite_sheet.png',193, 71);
	game.load.image('forest','assets/forest_tiles.png');
	game.load.image('dialogBox','assets/dialogBox.png');
}

//  setting variables for game objects
// you can manipulate a lot of properties from here
var atkanim;  	//attack animation (anim2 or hitanim2 are for enemy (as of now))
var atkanim2;  
var hitanim;    //hit (or hurt) animation 
var hitanim2; 
var power; //var that controls power of attacks (changes depending on attack chosen)
var attackPower = 3;  //specifices the exact power stat of attack (should be put in seperate list)
var attackPower2 = 3;
var potionRegen = 3;  //amount of health gained 
var player;
var player_X = 500;  // x/y coords of player
var player_Y = 250;
var enemy;
var enemy_X = 50;  // x/y coords of enemies
var enemy_Y = 250;
var dialogBox;
var infoBox;
var infolist = ["Hello","Goodbye","YO"]; //list of deforestation info
var mainMenu;
var fightOptions;
var backButton;
var backButton_X = 0; // x coor
var baseButton_1_X = 20;   // xcoord of base (frequently used) buttons
var baseButton_2_X = 220;  // when adding a commonly used button with different X or Y, add baseButton_(x)_X or Y
var baseButton_3_X = 420;
var baseButton_Y = 450;   // all buttons are based off of same y coord

function create(){
	// adding (displaying) our sprites to the game
	player = game.add.sprite(player_X, player_Y,'betty');
	enemy = game.add.sprite(enemy_X, enemy_Y, 'betty2');
	dialogBox = game.add.sprite(-15, 400, 'dialogBox');

	// rescaling sprites
	dialogBox.scale.setTo(2, 2);

	// creating infoBox
	var randInfo = Math.floor(Math.random() * (infolist.length)); //chooses random index from list
	infoBox = game.add.text(game.world.width/2, 425, 
	infolist[randInfo]);
    infoBox.anchor.set(0.5);   // places infoBox at center

    //displays new info after set interval
	game.time.events.loop(Phaser.Timer.SECOND * 2, show_infoBox, this); //*2 increases amount of seconds
	
	// setting health values
	player.maxHealth = 5;
	player.health = 5;
	enemy.maxHealth = 5;
	enemy.health = 5;

	// setting up our animation sequences (key, frames, frame rate, loop)
	atkanim = player.animations.add('spin',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],15,false); // defining animation frames here for now
	hitanim = player.animations.add('spin2',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],25,false); 
	atkanim2 = enemy.animations.add('spin3',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],15,false); 
	hitanim2 = enemy.animations.add('spin4',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],25,false); 
	
	// creating and customizing our healthbars
	// player health bar
	var playerBarConfig = {
    width: player.maxHealth*50,
    height: 40,
    x: 550,
    y: 200,
    bg: {    // bar's background color
      color: '#651828'
    },
    bar: {  //actual bar color (animated)
      color: '#FEFF03'
    },
    animationDuration: 200,  // set how fast bar increases/decreases
    flipped: false
  	};
	this.playerHealthBar = new HealthBar(this.game, playerBarConfig);

	// enemy health bar
	var enemyBarConfig = {
    width: enemy.maxHealth*50,
    height: 40,
    x: 150,
    y: 200,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#FEFF03'
    },
    animationDuration: 200,
    flipped: false
  	};
	this.enemyHealthBar = new HealthBar(this.game, enemyBarConfig);
	
	// creating groups for options (good for easy manipulation)
	mainMenu = game.add.group(); 
	fightOptions = game.add.group();
	itemsOptions = game.add.group();
	backButton = game.add.group();
	
	// (interactive) buttons for inital/main options
	fightButton = game.add.button( baseButton_1_X, baseButton_Y,'fightButton', 
	showFightMenu,this, 2, 1, 0); // fight button
	itemsButton = game.add.button( baseButton_2_X, baseButton_Y,'itemsButton', 
	showItemsOptions,this, 2, 1, 0); // items button
	runButton = game.add.button( baseButton_3_X, baseButton_Y, 'runButton', 
	runClicked,this, 2, 1, 0); // run button
	mainMenu.add(fightButton);
	mainMenu.add(itemsButton);
	mainMenu.add(runButton);	
	
	// buttons for different fight options
	var attack = game.add.button( baseButton_1_X, baseButton_Y, 'fightButton', 
	attackClicked,this, 1, 0, 2); // attack button
	var attack1 = game.add.button( baseButton_2_X, baseButton_Y, 'fightButton', 
	showFightMenu,this, 1, 0, 2); // attack1 button
	var attack2 = game.add.button( baseButton_3_X, baseButton_Y, 'fightButton', 
	showFightMenu,this, 1, 0, 2); // attack2 button
	fightOptions.add(attack);
	fightOptions.add(attack1);
	fightOptions.add(attack2);

	// buttons for different items options
	var potion = game.add.button( baseButton_1_X, baseButton_Y, 'itemsButton', 
	potionClicked,this, 1, 0, 2); // potion2 button
	var potion1 = game.add.button( baseButton_2_X, baseButton_Y, 'itemsButton', 
	showItemsOptions,this, 1, 0, 2); // potion1 button
	var potion2 = game.add.button( baseButton_3_X, baseButton_Y, 'itemsButton', 
	showItemsOptions,this, 1, 0, 2); // potion2 button
	itemsOptions.add(potion1);
	itemsOptions.add(potion);
	itemsOptions.add(potion2);

	// back button that returns to main screen
	var back = game.add.button(500, baseButton_Y, 'backButton',
	showMainMenu,this, 1, 0, 2); 
	backButton.add(back);

	//displays mainmenu/options
	showMainMenu();

}

//displays new info (after some time)
function show_infoBox(){
	var randInfo = Math.floor(Math.random() * (infolist.length)); //chooses random index from list
	infoBox.setText(infolist[randInfo]);
}

// clicking displays next set of options (subMenu)
// for example, showFightMenu() shows 3 attack options ontop of hud
function showFightMenu(){
	// show fightOptions and back button wile hiding mainMenu
	fightOptions.visible = true;
	showSubMenu();
}   
	function attackClicked(){
		hideHud();
		power = attackPower;   //sets power of attack according to power of move  
		atkanim.play();         //plays animation
		//should add an conditional (if hit)
		atkanim.onComplete.add(hitEnemy, this); //when atkanim is finished run hitEnemy function
	}

//items button
function showItemsOptions(){
	itemsOptions.visible = true;
	showSubMenu();
}
	//potions button
	function potionClicked() {
		player.heal(potionRegen);
		this.playerHealthBar.setPercent(100*enemy.health/enemy.maxHealth);
	}
// shows item submenu, hides mainmenu
function showSubMenu(){
	mainMenu.visible = false;
	backButton.visible = true;
}
//shows mainhud/menu while hiding all submenus
function showMainMenu(){
	fightOptions.visible = false;
	itemsOptions.visible = false;
	backButton.visible = false;
	mainMenu.visible = true;
	fightButton.frame = 1;  // fixed buttons are stuck at frame 2 bug (previous frame not reseting) by reseting frames
	itemsButton.frame = 1;
}

//hides all options (used after actions are done);
function hideHud(){
	mainMenu.visible = false;
	fightOptions.visible = false;
	itemsOptions.visible = false;
	backButton.visible = false;
}

//deals damage to enemy when hit and switches to enemy turn
function hitEnemy(){  
	hitanim2.play(); 
	enemy.damage(power);
	// health bar adjusts to percentage of health left
	this.enemyHealthBar.setPercent(100*enemy.health/enemy.maxHealth);
	hitanim2.onComplete.add(enemyTurn, this); // OLD BUG (before I had a new anim to use with .onComp(function,this)) fixed infinite loop bug (using new .onComplete while the first .onComplete's function is running) by using first sprite.onComplete)
	// plays enemy turn
	// enemyTurn();
}

// defines what enemy does in their turn (very basic ai here, they literally just attack)
function enemyTurn(){
	atkanim2.play();  
	power = attackPower2;   //se
	//again, add an conditional (if hit)
	atkanim2.onComplete.add(hitPlayer, this); // fixed infinite loop bug (using new .onComplete while the first .onComplete's function is running) by using first sprite.onComplete)
}

// deals damage to player when hit and switches to player turn
function hitPlayer(){
	hitanim.play();	
	player.damage(power);
	this.playerHealthBar.setPercent(100*player.health/player.maxHealth);
	playerTurn();   // play player turn
}
// shows options again
function playerTurn(){
	showMainMenu();
}

function runClicked(){
}

function update(){
}

//FIX COMMENTS
//FIX COMMENTS