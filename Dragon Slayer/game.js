// create a new scene
let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
    // player speed  
    this.playerSpeed = 3;
    
    // enemy speed
    this.enemySpeed = 3;
    
    // screen limits
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
    
};

// load assets
gameScene.preload = function(){
    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('enemy', 'assets/dragon.png')
    this.load.image('goal', 'assets/treasure.png')
};

// called once after the preload ends
gameScene.create = function() {
    // create bg sprite
    this.bg = this.add.sprite(0, 0, 'background');
    // change the origin to the top-left corner
    this.bg.setOrigin(0,0);
    
    // create the player
    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
    // with setScale you can change the scale of an image
    this.player.setScale(0.5);
    
    // create the treasure
    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
    // scale it to half size
    this.goal.setScale(0.5);
    
    // create an enemy1
    this.enemy = this.add.sprite(120, this.sys.game.config.height / 2, 'enemy');
    this.enemy.setScale(0.6);
    // flip
    this.enemy.flipX = true;
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
    // checks for input
    if(this.input.activePointer.isDown){
        // player walks
        this.player.x += this.playerSpeed;
    };
    
    // variables to check treasure overlap
    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();
    
    // treasure overlap check
    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        console.log('reached goal!');
        
        // restarts the Scene
        this.scene.restart();
        return;
    };
    
    // enemy movement
    this.enemy.y += this.enemySpeed;
    
    // check we haven't passed min Y
    let topReached = this.enemy.y <= this.enemyMinY;
    let botReached = this.enemy.y >= this.enemyMaxY;
    
    if(topReached || botReached) {
        // reverse speed
        this.enemySpeed *= -1;  
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