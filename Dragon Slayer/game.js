// create a new scene
let gameScene = new Phaser.Scene('Game');

// initiate scene parameters
gameScene.init = function() {
    // player speed  
    this.playerSpeed = 3;
    
    // enemy speed
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4.5;
    
    // screen limits
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
    
    // game over parameter
    this.isTerminating = false;
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
    
    // create an enemy
    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: {
            x: 90,
            y: 100,
            stepX: 80,
            stepY: 20
        }
    });
    
    // scaling all the enemies 40%
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);
    
    // set flipX, and speed
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        // flip
        enemy.flipX = true;
        
        // set enemy speed randomly 
        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;
    }, this);
};

// this is called up to 60 times per second
gameScene.update = function(){
    
    // don't execute if we are terminating
    if(this.isTerminating) return;
    
    // checks for input
    this.input.activePointer = null;
    if(this.input.activePointer.isDown){
        // player walks
        this.player.x += this.playerSpeed;
    };
    
    // variables to check treasure overlap
    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();
    
    // treasure overlap check
    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        // if I set it to alert it bugs when you keep the mouse clicked when you win, then you need to restart
        console.log('reached goal!');
        
        // restarts the Scene
        return this.scene.restart();
    };
    
    // get enemies
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;
    
    for(let i = 0; i < numEnemies; i++) {
        // enemy movement
        enemies[i].y += enemies[i].speed;

        // check we haven't passed min or max Y
        let topReached = enemies[i].y <= this.enemyMinY;
        let botReached = enemies[i].y >= this.enemyMaxY;

        if(topReached || botReached) {
            // reverse speed
            enemies[i].speed *= -1;  
        };
        
        // variables to check treasure overlap
        let enemyRect = enemies[i].getBounds();

        // treasure overlap check
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            // if I set it to alert it bugs when you keep the mouse clicked when you win, then you need to restart
            console.log('Game over!');
            
            return this.gameOver();
        };
    };
};

gameScene.gameOver = function() {
    
    // initiated game over sequence
    this.isTerminating = true;
    
    // shake camera on game over
    this.cameras.main.shake(500);
    
    // listen for event completion
    this.cameras.main.on('camerashakecomplete', function(camera, effect) {
        // fade out
        this.cameras.main.fade(500);
    }, this); // this last "this" is for the "this" property to be available inside the function
    
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        // restarts the Scene
        this.scene.restart();
    }, this); // this last "this" is for the "this" property to be available inside the function
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