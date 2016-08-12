var earthChant = earthChant || {};
//creating base game
earthChant.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

//setting up game states (secnes/instances)
earthChant.game.state.add('World', SpaceHipster.Boot); //main world
earthChant.game.state.add('Batlle', SpaceHipster.Game); //battle scene

//stating our World state
earthChant.game.state.start('World');