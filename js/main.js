var earthChant = earthChant || {};
// creating base game
earthChant.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

// setting up game states (scences/instances)
earthChant.game.state.add('Preload', earthChant.Preload);
earthChant.game.state.add('World', earthChant.World); // main world
earthChant.game.state.add('Battle', earthChant.Battle); // battle scene

// starting our Preload state
earthChant.game.state.start('Preload');