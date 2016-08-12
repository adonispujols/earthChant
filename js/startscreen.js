var earthChant = earthChant || {};
//NOTES NOTES NOTES NOTES:

//MAJOR:
// TOO SIMILAR TO POKEMON! (keep button system)
// FOCUS GAME ON POLLUTION!!!
// TURN INTO MINI GAME ENGINE (easily manipulable)

//MINOR:
// FIX/ADD COMMENTS
// STORE PLAYER'S LOCATION WHEN LEAVING BATTLE
// USE BOOTSTRAP TO RESIZE SCREEN 
// calling earthchant from main game
earthChant.StartScreen = function(){};

earthChant.StartScreen.prototype = {

	create: function() {
		this.cursors;
		// cursor controls (arrow keys)
		this.cursors = this.game.input.keyboard.createCursorKeys();
		// start button
		// CHANGE TO ONMOUSE CLICKED
		this.startButton = this.game.add.button(300, 300,'fightButton', 
		this.startGame,this, 2, 1, 0);
	},
	startGame: function(){
		this.game.state.start('World');
	},
	update: function() {
	}
};