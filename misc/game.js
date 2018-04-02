GameStates.Game = function (game) {

};

GameStates.Game.prototype = {
    
    create: function () {
        //below code creates a simple tween animation. You will want to delete this when adding your code
        //var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        //logo.anchor.setTo(0.5, 0.5);
        //logo.scale.setTo(0.2, 0.2);
        //this.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.add.sprite(0, 0, 'sky');      
      

        //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically       

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, this.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');

        ledge.body.immovable = true;

        // The player and its settings
        player = this.add.sprite(55, this.world.height - 150, 'unicorn');

        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        ////  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.3, 0.5);
         
        ////  Our two animations, walking left and right.
        player.animations.add('jumpleft', Phaser.Animation.generateFrameNames('jumpLeft',1,7,'',0),10,true);
        player.animations.add('jumpRight', Phaser.Animation.generateFrameNames('jumpRight', 1, 7, '', 0), 10, true);
        player.animations.add('idleLeft', Phaser.Animation.generateFrameNames('IdleLeft', 1, 7, '', 0), 10, true);
        player.animations.add('idleRight', Phaser.Animation.generateFrameNames('IdleRight', 1, 7, '', 0), 10, true);
        player.animations.add('runLeft', Phaser.Animation.generateFrameNames('RunLeft', 1, 7, '', 0), 10, true);
        player.animations.add('runRight', Phaser.Animation.generateFrameNames('RunRight', 1, 7, '', 0), 10, true);

        //  Creates 1 single bullet, using the 'bullet' graphic
        weapon = this.add.weapon(1, 'bullet');

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        weapon.bulletAngleOffset = 90;

        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 400;

        weapon.trackSprite(player, 14, 0);
        //  Finally some stars to collect
        stars = this.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = this.input.keyboard.createCursorKeys();

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    },

    update: function ()
    {
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.arcade.overlap(player, stars, collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('runLeft');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('runRight');
        }
        else {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -350;
        }

        if (fireButton.isDown) {
            weapon.fire();
        }



        // Removes the star from the screen
       
       
    },

    render: function () { },

};
