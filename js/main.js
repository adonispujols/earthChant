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
// creating base game
earthChant.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

// setting up game states (scences/instances)
// add more scenes by using below and startscreen.js as templates. make sure there's a game.start point towards your new state (and vice versa)
earthChant.game.state.add('Preload', earthChant.Preload);
earthChant.game.state.add('StartScreen', earthChant.StartScreen);
earthChant.game.state.add('World', earthChant.World); // main world
earthChant.game.state.add('Battle', earthChant.Battle); // battle scene

// starting our Preload state
earthChant.game.state.start('Preload');