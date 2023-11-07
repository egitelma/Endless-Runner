class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image("bubble", "./assets/bubble.png");
        this.load.image("emptyHeart", "./assets/empty_heart.png");
        this.load.image("filledHeart", "./assets/filled_heart.png");
        this.load.image("seaweedFront", "./assets/seaweed.png");
        this.load.image("background_01", "./assets/background.png");

        //load audio
        this.load.audio("background_music", "./assets/background_music.mp3");
        this.load.audio("faster_music", "./assets/faster_music.mp3");
        this.load.audio("game_over", "./assets/game_over.mp3");
        this.load.audio("explosion_sfx", "./assets/explosion_sfx.mp3");
    }

    create(){

        //VARIABLES:

        //text config
        textConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
        }

        //keyboard cursors
        cursors = this.input.keyboard.createCursorKeys();
        keyUP = cursors.up;
        keyDOWN = cursors.down;
        keyLEFT = cursors.left;
        keyRIGHT = cursors.right;

        //game state variables
        this.dangerLevel = 1; //probability that something dangerous will appear
        this.swimSpeed = 1;
        this.lives = 3;

        //feesh
        this.fishGroup = this.add.group({
            runChildUpdate: true
        });
        score.totalFish = 0;
        //bomba
        this.bombGroup = this.add.group({
            runChildUpdate: true
        })
        //sharks
        this.sharkGroup = this.add.group({
            runChildUpdate: true
        })
        //bubbles
        this.bubbleGroup = this.add.group();

        //set up graphics & background gradient
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x4dc9c6, 0x4dc9c6, 0x000000, 0x000000, 1);
        graphics.fillRect(0, 0, width, height);

        //tile sprites
        this.background01 = this.add.tileSprite(0, 0, 960, 640, "background_01").setOrigin(0, 0);
        this.seaweedFront = this.add.tileSprite(0, 0, 960, 640, "seaweedFront").setOrigin(0, 0);
        this.seaweedFront.depth = 1; //and STAY in the foreground

        //diver
        this.diver = this.physics.add.sprite(200, height/2, "diver").setScale(2);
        this.diver.body.setCollideWorldBounds(true);

        //text on screen
        this.distanceText = this.add.text(0, 0, "DISTANCE: "+score.distance+" METERS", textConfig).setOrigin(0);
        this.distanceText.depth = 1;
        this.fishText = this.add.text(0, 30, "FISH CAUGHT: " + score.totalFish, textConfig);
        this.fishText.depth = 1;

        //lives
        this.hearts = []
        for (let i=1; i<=this.lives; i++){
            this.hearts.push(this.add.sprite(width-(48*i), 8, "filledHeart").setScale(2).setOrigin(0));
            this.hearts[this.hearts.length-1].depth = 1;
        }

        //vector constants
        this.DIVER_VELOCITY = 200;
        this.SCROLL_SPEED = -100;


        //ANIMATIONS:
        //swimming animation
        this.anims.create({
            key: "diver-swim",
            frameRate: 5, //i want to try to get this to be set to update 
            repeat: -1,
            frames: this.anims.generateFrameNumbers("diver", {
                start: 0,
                end: 3
            })
        });
        //bomb animation
        this.anims.create({
            key: "bomb-explode",
            frameRate: 3, //boom fast!
            repeat: 0,
            frames: this.anims.generateFrameNumbers("bomb", {
                start: 4,
                end: 6
            })
        });


        //COLLIDERS:
        //diver-fish collider
        this.physics.add.collider(this.diver, this.fishGroup, (diver, fish) => {
            fish.destroy();
            score.totalFish++;
            this.fishText.destroy();
            this.fishText = this.add.text(0, 30, "FISH CAUGHT: " + score.totalFish, textConfig);
            this.fishText.depth = 1;
        });

        //diver-bomb collider
        //slows you down,lose a life, destroy bomb, lose game if all lives are lost
        this.physics.add.collider(this.diver, this.bombGroup, (diver, bomb) => {
            this.destroyBomb(bomb);
            this.sound.play("explosion_sfx");
            //bomb removed - remove lives
            this.takeDamage();
        });

        //diver-shark collider
        this.physics.add.collider(this.diver, this.sharkGroup, (diver, shark) => {
            shark.destroy();
            this.takeDamage();
        });
        

        //TIMED EVENTS:
        //increase score
        this.increaseDistance = this.time.addEvent({
            delay: 1000,
            callback: () => {
                score.distance += this.swimSpeed;
                this.distanceText.destroy();
                this.distanceText = this.add.text(0, 0, "DISTANCE: "+score.distance+" METERS", textConfig).setOrigin(0);
                this.distanceText.depth = 1;
            },
            loop: true
        });

        //increase speed every 5 seconds
        this.increaseSpeed = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.swimSpeed += 0.5;
            },
            loop: true
        });

        //increase danger every 10 seconds
        this.increaseDifficulty = this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.dangerLevel++;
                if(this.dangerLevel == 5){
                    this.backgroundMusic.stop();
                    this.fasterMusic.play();
                }
            },
            loop: true
        });

        //place fish every second
        this.placeFish = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.addFish()
            },
            loop: true
        });

        //place bubbles every half-second
        this.placeBubble = this.time.addEvent({
            delay: 500,
            callback: () => {
                this.addBubble()
            },
            loop: true
        });

        //place dangers dependent on danger level. Spawn number of dangers based on danger level
        this.placeDanger = this.time.addEvent({
            delay: 1250,
            callback: () => {
                for(let i=0; i<this.dangerLevel; i++){
                    this.addBomb();
                }
                if(this.dangerLevel > 5){
                    //after you've gotten to Danger Level 5, start spawning sharks
                    this.addShark();
                }
            },
            loop: true
        });

        //play those funky tunes!
        this.backgroundMusic = this.sound.add("background_music", {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true
        });

        this.fasterMusic = this.sound.add("faster_music", {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true
        });
        
        this.backgroundMusic.play();
    }

    addFish() {
        //adds fish to fishGroup
        let randomY = Phaser.Math.Between(20, height-20);
        let fish = this.physics.add.sprite(width, randomY, "fish").setScale(3);
        fish.setVelocity(this.SCROLL_SPEED*this.swimSpeed, 0);
        this.fishGroup.add(fish);
    }

    addBomb() {
        //adds bomb to bombGroup
        let randomX = Phaser.Math.Between(width/6, (width/6)*5);
        let newBomb = this.physics.add.sprite(randomX, 0, "bomb").setScale(0.5);
        newBomb.body.allowGravity = true;
        newBomb.body.setVelocityY(-this.SCROLL_SPEED*this.swimSpeed);
        newBomb.body.setVelocityX(this.SCROLL_SPEED*this.swimSpeed);
        this.bombGroup.add(newBomb)
    }

    addShark() {
        //adds shark to sharkGroup
        let randomY = Phaser.Math.Between(height/4, height/4*3);
        let newShark = this.physics.add.sprite(width, randomY, "shark").setScale(2);
        newShark.body.allowGravity = true;
        newShark.body.setVelocityX(this.SCROLL_SPEED*2);
        this.sharkGroup.add(newShark)
    }

    addBubble() {
        //add bubble to bubbleGroup
        let randomX = Phaser.Math.Between(0, width);
        let bubble = this.physics.add.sprite(randomX, height, "bubble").setAlpha(0.5);
        bubble.body.setVelocityY(this.SCROLL_SPEED*2);
        bubble.body.setVelocityX(this.SCROLL_SPEED*0.5);
        this.bubbleGroup.add(bubble);
    }
    
    takeDamage() {
        this.lives--;
        this.hearts[this.lives].setTexture("emptyHeart");
        if (this.lives == 0) {
            //lose game
            this.backgroundMusic.stop();
            this.fasterMusic.stop();
            this.sound.play("game_over");
            this.scene.start("gameoverScene");
        }
    }

    destroyBomb(bomb) {
        bomb.disableBody();
        bomb.play("bomb-explode", true);
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                bomb.destroy();
            },
            loop: false
        });
    }

    update(){
        //scroll items
        this.seaweedFront.tilePositionX += this.swimSpeed*2;
        this.background01.tilePositionX += this.swimSpeed*0.5;

        //move character
        let diverDirection = 0;
        if(keyUP.isDown) {
            diverDirection = -1;
        }
        else if(keyDOWN.isDown) {
            diverDirection = 1;
        }
        this.diver.setVelocity(0, diverDirection*this.DIVER_VELOCITY);

        //play animations
        this.diver.play("diver-swim", true);
        // this.seaweed.play("seaweed-idle", true);
    }
}