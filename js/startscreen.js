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
		this.game.stage.backgroundColor = '#808080'; //back ground color
		
		this.logo = this.game.add.sprite(100,150,'logo');  //logo
		this.logo.scale.setTo(.8, .8);  //resizing logo

		// cursor controls (arrow keys)
		this.cursors;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		// intial button (shows intro screen
		this.initialButton = this.game.add.button(300, 500,'buttons',  		// CHANGE TO ONMOUSE CLICKED
		this.showIntro,this, 2, 1, 0);
		this.initialButton.scale.setTo(2,.5);    //rescale
		this.startText = this.game.add.text(this.initialButton.x + 100, this.initialButton.y, 'Click here to Start'); //text for button
	},
	
	// shows the intro screen (add images/text here)
	showIntro: function(){
		// hide previous items
		this.initialButton.kill();
		this.logo.kill();
		
		// start game button (similar to initial)
		this.startButton = this.game.add.button(300, 500,'buttons', 
		this.startGame,this, 2, 1, 0);
		this.startButton.scale.setTo(2,.5);
		this.startText = this.game.add.text(this.startButton.x + 200, this.startButton.y, 'PLAY');	// sends to start game()		
	},
	
	// sends to World screen (Starts game)
	startGame: function(){
		this.game.state.start('World');
	},
	update: function() {
	}
};
