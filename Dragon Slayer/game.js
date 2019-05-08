// create a new scene

let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
  // player speed  
    this.playerSpeed = 3;
};

// load assets
gameScene.preload = function(){
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('enemy', 'assets/dragon.png')
};

// called once after the preload ends
gameScene.create = function() {
    // create bg sprite
    this.bg = this.add.sprite(0, 0, 'background');
    
    // change the origin to the top-left corner
    this.bg.setOrigin(0,0);
    
    // create the player
    this.player = this.add.sprite(40, 180, 'player');
    
    // with setScale you can change the scale of an image
    this.player.setScale(0.5);
    
//    // create an enemy1
//    this.enemy1 = this.add.sprite(250, 180, 'enemy');
//    this.enemy1.setScale(0.75);
//    // flip
//    this.enemy1.flipX = true;
//    
//    // create an enemy2
//    this.enemy2 = this.add.sprite(350, 180, 'enemy');
//    this.enemy2.setScale(0.75);
//    // flip
//    this.enemy2.flipX = true;
//    
};

// this is called up to 60 times per second
gameScene.update = function(){
    if(this.input.activePointer.isDown){
        // player walks
        this.player.x += this.playerSpeed;
    };
    
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