class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load button spritesheets
        this.load.spritesheet("controlsButton", "./assets/controls.png", {
            frameWidth: 160, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 2
        });
        this.load.spritesheet("creditsButton", "./assets/credits.png", {
            frameWidth: 160, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 2
        });
        this.load.spritesheet("playButton", "./assets/play.png", {
            frameWidth: 160, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 2
        });
        this.load.image("menuBG", "./assets/diver_menu.png");

        //stuff that we need in both Play and Controls
        this.load.spritesheet("diver", "./assets/diver.png", {
            frameWidth: 64, 
            frameHeight: 16, 
            startFrame: 0, 
            endFrame: 3
        });
        this.load.spritesheet("bomb", "./assets/bomb.png", {
            frameWidth: 64, 
            frameHeight: 64, 
            startFrame: 0, 
            endFrame: 6
        });
        this.load.image("fish", "./assets/fish.png");
        this.load.image("shark", "./assets/shark.png");

        //audio
        this.load.audio("menu_music", "./assets/menu_music.mp3");
        this.load.audio("game_start", "./assets/game_start.mp3");
        this.load.audio("select_sfx", "./assets/select_sfx.mp3");
        this.load.audio("menu_sfx", "./assets/menu_sfx.mp3");
    }

    create(){
        //set up graphics
        const graphics = this.add.graphics();

        graphics.fillGradientStyle(0x4dc9c6, 0x4dc9c6, 0x000000, 0x000000, 1);
        graphics.fillRect(0, 0, game.config.width, game.config.height);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //text config
        textConfig = {
            fontFamily: "Courier",
            fontSize: "10px",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
        }

        this.title = this.add.sprite(width/16, height/4, "menuBG").setOrigin(0);
        this.title = this.add.text(width/2, height-20, "PRESS [SPACE] TO SELECT", textConfig).setOrigin(0.5);
        this.title = this.add.text(width/2, height-10, "↓↑ TO NAVIGATE", textConfig).setOrigin(0.5);

        //3 buttons: CONTROLS, CREDITS!, DIVE!!!
        //plus something telling us to press SPACE
        this.buttons = [];

        this.controls = {
            sprite: this.add.sprite(width/4*3, height/5*2, "controlsButton").setScale(2).setOrigin(0.5, 1),
            name: "controls"
        }
        this.buttons.push(this.controls);

        this.credits = {
            sprite: this.add.sprite(width/4*3, height/5*3, "creditsButton").setScale(2).setOrigin(0.5, 1),
            name: "credits"
        }
        this.buttons.push(this.credits);

        this.play = {
            sprite: this.add.sprite(width/4*3, height/5*4, "playButton").setScale(2).setOrigin(0.5, 1),
            name: "play"
        }
        this.buttons.push(this.play);
        this.selected = 0; //index of selected item

        //flashing button animations
        this.anims.create({
            key: "controls-unselected",
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("controlsButton", {
                start: 0,
                end: 0
            })
        });

        this.anims.create({
            key: "controls-selected",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("controlsButton", {
                start: 1,
                end: 2
            })
        });

        this.anims.create({
            key: "credits-unselected",
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("creditsButton", {
                start: 0,
                end: 0
            })
        });

        this.anims.create({
            key: "credits-selected",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("creditsButton", {
                start: 1,
                end: 2
            })
        });

        this.anims.create({
            key: "play-unselected",
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playButton", {
                start: 0,
                end: 0
            })
        });

        this.anims.create({
            key: "play-selected",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playButton", {
                start: 1,
                end: 2
            })
        });

        //music :)
        menuMusic = this.sound.add("menu_music", {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true
        });

        menuMusic.play();
        
        
    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            //what are we selecting?
            //Controls, Credits, and Play buttons
            switch(this.buttons[this.selected].name){
                case "controls":
                    this.sound.play("menu_sfx");
                    this.scene.start("controlsScene");
                    break;
                case "credits":
                    this.sound.play("menu_sfx");
                    this.scene.start("creditsScene");
                    break;
                case "play":
                    menuMusic.stop();
                    this.sound.play("game_start");
                    this.scene.start("playScene");
                    break;
            }
        }

        //menuing - up and down arrows to select
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            this.sound.play("select_sfx");
            if(this.selected != 0){
                //select previous item in menu
                this.selected--;
            }
            else {
                //wrap around to bottom of menu
                this.selected = this.buttons.length-1;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.sound.play("select_sfx");
            if(this.selected != this.buttons.length-1){
                //select next item in menu
                this.selected++;
            }
            else {
                //wrap around to top of menu
                this.selected = 0;
            }
        }

        //play animations for buttons if selected
        for(let i=0; i<this.buttons.length; i++){
            if (i == this.selected){
                this.buttons[i].sprite.play(this.buttons[i].name + "-selected");
            }
            else {
                this.buttons[i].sprite.play(this.buttons[i].name + "-unselected");
            }
        }
    }
}