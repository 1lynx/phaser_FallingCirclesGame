var game = new Phaser.Game(600, 600);
var vitesse = 600;

var FallingCircles = {
    preload: function() {
        game.load.image('fond', 'asset/fond.png');
        game.load.image('player', 'asset/player.png');
        game.load.image('ennemy', 'asset/ennemy.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'fond');
        this.player = game.add.sprite(300, 500, 'player');
        this.player.anchor.set(0.5);
        game.physics.arcade.enable(this.player);
        this.cursors= game.input.keyboard.createCursorKeys();
        this.ennemyGroup = game.add.group();
        this.timer = game.time.events.loop(200, this.addEnnemy, this);
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#fff"});
        
    },
    update: function() {
        game.physics.arcade.overlap(this.player, this.ennemyGroup, this.restartGame, null, this);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = vitesse * -1;
        }
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = vitesse;
        }
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = vitesse * -1;
        }
        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = vitesse;
        }
        if (this.player.inWorld == false) {
            this.restartGame();
        }
    },
    restartGame: function() {
        game.state.start('FallingCircles');
    },
    addEnnemy: function() {
        var position = Math.floor(Math.random() * 550) + 1;
        var ennemy = game.add.sprite(position, -50, 'ennemy');
        game.physics.arcade.enable(ennemy);
        ennemy.body.gravity.y = 200;
        
        this.ennemyGroup.add(ennemy);
        
        this.score += 20;
        this.labelScore.text = this.score;
        
        ennemy.checkWorldBounds = true;
        ennemy.outOfBoundsKill = true;
    }
};

game.state.add('FallingCircles', FallingCircles);
game.state.start('FallingCircles');