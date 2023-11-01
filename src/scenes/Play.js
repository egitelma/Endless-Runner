class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.spritesheet("diver", "./assets/diver.png", {
            frameWidth: 64, 
            frameHeight: 16, 
            startFrame: 0, 
            endFrame: 3
        });
        this.load.image("fish", "./assets/fish.png")
        this.load.image("seaweedFront", "./assets/seaweed.png");
        this.load.image("background_01", "./assets/background.png");
    }

    create(){
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

        //set up graphics
        const graphics = this.add.graphics();

        graphics.fillGradientStyle(0x4dc9c6, 0x4dc9c6, 0x000000, 0x000000, 1);
        graphics.fillRect(0, 0, width, height);

        //background tile sprite
        this.background01 = this.add.tileSprite(0, 0, 960, 640, "background_01").setOrigin(0, 0);

        // this.diver = new Diver(this, 112, height/2, "diver").setScale(3);
        this.diver = this.physics.add.sprite(0, height/2, "diver").setScale(2);
        this.diver.setCollideWorldBounds(true);

        //foreground tile sprite
        this.seaweedFront = this.add.tileSprite(0, 0, 960, 640, "seaweedFront").setOrigin(0, 0);
        this.seaweedFront.depth = 1; //and STAY in the foreground

        //feesh
        // this.fish = this.add.group(); //array of Fish objects on screen
        this.fish = [];

        //keyboard cursors
        cursors = this.input.keyboard.createCursorKeys();
        keyUP = cursors.up;
        keyDOWN = cursors.down;
        keyLEFT = cursors.left;
        keyRIGHT = cursors.right;

        //variables
        this.dangerProbability = 1; //probability that something dangerous will appear
        this.swimSpeed = 1;
        this.distanceSwam = 0;
        this.fishCounter = 0;
        this.fishText = this.add.text(0, 30, "FISH CAUGHT: " + this.fishCounter, textConfig);

        //swimming animation
        this.anims.create({
            key: "diver-swim",
            frameRate: this.swimSpeed,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("diver", {
                start: 0,
                end: 3
            })
        });

        //diver-fish collider
        this.physics.add.collider(this.diver, this.fish, (diver, fish) => {
            fish.destroy();
            this.fishCounter++;
            this.fishText.destroy();
            this.fishText = this.add.text(0, 30, "FISH CAUGHT: " + this.fishCounter, textConfig);
        });

        //text on screen
        this.distanceText = this.add.text(0, 0, "DISTANCE: "+this.distanceSwam+" METERS", textConfig).setOrigin(0);

        //increase score
        this.increaseDistance = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.distanceSwam += this.swimSpeed;
                this.distanceText.destroy();
                this.distanceText = this.add.text(0, 0, "DISTANCE: "+this.distanceSwam+" METERS", textConfig).setOrigin(0);
            },
            loop: true
        });

        //increase speed every 5 seconds
        this.increaseSpeed = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.swimSpeed += 0.5
            },
            loop: true
        });

        //increase danger every 10 seconds
        this.increaseDifficulty = this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.dangerProbability++;
            },
            loop: true
        });

        //place fish every second
        this.placeFish = this.time.addEvent({
            delay: 1000,
            callback: () => {
                let randomY = Phaser.Math.Between(20, height-20);
                // this.fish.create(this.physics.add.sprite(width, randomY, "fish").setScale(3));
                // let fishArray = this.fish.getChildren();
                // console.log(fishArray);
                this.fish.push(this.physics.add.sprite(width, randomY, "fish").setScale(3));
            },
            loop: true
        });
        
        
        this.DIVER_VELOCITY = 200;
        this.FISH_VELOCITY = -100;
        // Phaser.Actions.IncX(this.fish.getChildren(), this.FISH_VELOCITY);

    }

    update(){
        //scroll items
        this.seaweedFront.tilePositionX += this.swimSpeed*2;
        this.background01.tilePositionX += this.swimSpeed;

        for (let i=0; i<this.fish.length; i++){
            this.fish[i].setVelocity(this.FISH_VELOCITY, 0);
        }
        
        // let fishArray = this.fish.getChildren();
        // for (let i=0; i<fishArray.length; i++){
        //     fishArray[i].x -= this.FISH_VELOCITY;
        //     // fishArray[i].setVelocity(this.FISH_VELOCITY, 0);
        // }

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