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
		this.game.load.spritesheet('betty','assets/sprites/betty.png', 48, 48, 16);
		this.game.load.spritesheet('deadPlayer','assets/sprites/tree.png', 48, 48, 16);
		this.game.load.spritesheet('deadEnemy','assets/sprites/tree.png', 48, 48, 16);
		this.game.load.spritesheet('betty1','assets/sprites/betty.png', 48, 48, 16);
		this.game.load.spritesheet('betty2', 'assets/sprites/betty.png', 48, 48, 16);
		this.game.load.spritesheet('betty2', 'assets/sprites/betty.png', 48, 48, 16);
		this.game.load.spritesheet('fightButton','assets/sprites/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('itemsButton','assets/sprites/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('runButton','assets/sprites/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('backButton','assets/sprites/button_sprite_sheet.png',193, 71);
		this.game.load.image('dialogBox','assets/sprites/dialogBox.png');
		this.game.load.spritesheet('smog','assets/sprites/smog.png', 416,416,2);
		this.game.load.spritesheet('canEnemy','assets/sprites/canEnemy.png', 192,192,2);
		this.game.load.spritesheet('snake','assets/sprites/snake.png',416,416,2);
		this.game.load.image('tree','assets/sprites/tree.png',32,32);
		this.game.load.spritesheet('trashMan','assets/sprites/trashMan.png',416,416,2);
		},

	create: function() {
		// starting physics system, for easy movement control/collision detection
		this.game.physics.startSystem(Phaser.Physics.ARCADE)

		// goes to start screen state/scene
		this.game.state.start('StartScreen');
	}
};