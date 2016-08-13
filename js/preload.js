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
// calling earthchant from main game
earthChant.Preload = function(){};

earthChant.Preload.prototype = {
	preload: function() {
		// loading sprite sheet. key, url, width, hieght, frames
		this.game.load.spritesheet('betty','assets/betty.png', 48, 48, 16);
		this.game.load.spritesheet('deadPlayer','assets/forest_tiles.png', 48, 48, 16);
		this.game.load.spritesheet('deadEnemy','assets/forest_tiles.png', 48, 48, 16);
		this.game.load.spritesheet('betty1','assets/betty.png', 48, 48, 16);
		this.game.load.spritesheet('betty2', 'assets/betty.png', 48, 48, 16);
		this.game.load.spritesheet('betty2', 'assets/betty.png', 48, 48, 16);
		this.game.load.spritesheet('fightButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('itemsButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('runButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('backButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.image('forest','assets/forest_tiles.png');
		this.game.load.image('dialogBox','assets/dialogBox.png');
		this.game.load.spritesheet('smog','assets/smog.png', 416,416,2);
		this.game.load.spritesheet('canEnemy','assets/canEnemy.png', 192,192,2);
		this.game.load.spritesheet('snake','assets/snake.png',416,416,2);
		this.game.load.image('tree','assets/tree.png',32,32);
		this.game.load.spritesheet('trashMan','assets/trashMan.png',416,416,2);
		},

	create: function() {
		// starting physics system, for easy movement control/collision detection
		this.game.physics.startSystem(Phaser.Physics.ARCADE)

		// goes to start screen state/scene
		this.game.state.start('StartScreen');
	}
};