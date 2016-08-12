var earthChant = earthChant || {};

// calling earthchant from main game
earthChant.Preload = function(){};
earthChant.Preload.prototype = {
	preload: function() {
		// loading sprite sheet. key, url, width, hieght, frames
		this.load.spritesheet('betty','assets/betty.png', 48, 48, 16);
		this.load.spritesheet('betty1','assets/betty.png', 48, 48, 16);
		this.game.load.spritesheet('betty2', 'assets/betty.png', 48, 48, 16);
		this.game.load.spritesheet('fightButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('itemsButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('runButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.spritesheet('backButton','assets/button_sprite_sheet.png',193, 71);
		this.game.load.image('forest','assets/forest_tiles.png');
		this.game.load.image('dialogBox','assets/dialogBox.png');
		},

	create: function() {
		// staring physics system, for easy movement control/collision detection
		this.game.physics.startSystem(Phaser.Physics.ARCADE)

		// create world state
		this.state.start('World');
	}
};