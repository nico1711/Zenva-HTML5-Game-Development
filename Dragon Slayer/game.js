// create a new scene

let gameScene = new Phaser.Scene('Game');

// load assets
gameScene.preload = function(){
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('enemy', 'assets/dragon.png')
};

// called once after the preload ends
gameScene.create = function() {
    // create bg sprite
    let bg = this.add.sprite(0, 0, 'background');
    
    // change the origin to the top-left corner
    bg.setOrigin(0,0);
    
    // create the player
    let player = this.add.sprite(50, 180, 'player');
    
    // with setScale you can change the scale of an image
    player.setScale(0.5);
    
    // create an enemy1
    let enemy1 = this.add.sprite(250, 180, 'enemy');
    enemy1.setScale(0.75);
    // flip
    enemy1.flipX = true;
    
    // create an enemy2
    let enemy2 = this.add.sprite(350, 180, 'enemy');
    enemy2.setScale(0.75);
    enemy2.flipX = true;
    
};

// set the configuration of the game
let config = {
    type: Phaser.AUTO, //Phaser will use WebGL if available
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);