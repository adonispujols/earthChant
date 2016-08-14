var earthChant = earthChant || {};
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
// MAKE ENEMIES

earthChant.StartScreen = function(){};

earthChant.StartScreen.prototype = {

	create: function() {
		this.background = this.game.add.sprite(0,0,'background');
		this.game.stage.backgroundColor = '#FFFFFF'; //back ground color
		
		this.logo = this.game.add.sprite(100,150,'logo');  //logo
		this.logo.scale.setTo(.8, .8);  //resizing logo

		// cursor controls (arrow keys)
		this.cursors;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		// start button
		// CHANGE TO ONMOUSE CLICKED
		this.startButton = this.game.add.button(300, 300,'buttons', 
		this.startGame,this, 2, 1, 0);
		this.startText = this.game.add.text(this.startButton.x, this.startButton.y, 'Click here to Start');
	},
	startGame: function(){
		this.game.state.start('World');
	},
	update: function() {
	}
};