class Controls extends Phaser.Scene {
    constructor(){
        super("controlsScene");
    }

    create() {
        const graphics = this.add.graphics();

        graphics.fillGradientStyle(0x4dc9c6, 0x4dc9c6, 0x000000, 0x000000, 1);
        graphics.fillRect(0, 0, game.config.width, game.config.height);

        textConfig = {
            fontFamily: "Courier",
            fontSize: "15px",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            wordWrap: {
                width: 600
            }
        }

        
        this.diver = this.add.sprite(0, height/6, "diver", 0).setScale(2).setOrigin(0);
        this.fish = this.add.sprite(50, height/4, "fish").setScale(2).setOrigin(0);
        this.bomb = this.add.sprite(50, height/3, "bomb", 0).setScale(0.5).setOrigin(0);
        this.shark = this.add.sprite(50, height/2, "shark").setScale(2).setOrigin(0);

        //point to score ←→
        this.scoreText = this.add.text(width/3, 0, "← This is the score. It shows how far you've swam and how many fish you've caught.", textConfig).setOrigin(0);
        //point to diver
        this.diverText = this.add.text(width/6, height/6, "← This is the pilot (you). Move up and down with the ↓ & ↑ keys.", textConfig).setOrigin(0);
        //point to fish
        this.fishText = this.add.text(width/6, height/4, "← This is a fish. Collect as many as possible.", textConfig).setOrigin(0);
        //point to bomb
        this.bombText = this.add.text(width/6, height/3, "← This is a bomb. Avoid them at all costs!", textConfig).setOrigin(0);
        //point to shark
        this.sharkText = this.add.text(width/4, height/2, "← This is a shark. They'll start appearing when you get far. Stay out of their way!", textConfig).setOrigin(0);

        //direct instructions
        textConfig.wordWrap.width = 900;
        this.instructions = this.add.text(10, height/4*3, "You're a talented diver-pilot, trying to achieve your goal of crossing the ocean and collect as many fish as possible. But the ocean is... really long. Avoid bombs and sharks and make it as far as you can!", textConfig).setOrigin(0);

        //back to Menu
        textConfig.fontSize = "10px";
        this.add.text(width/2, height-20, "BACKSPACE to return to menu", textConfig).setOrigin(0.5);

        //score text
        textConfig.fontSize = "28px"
        textConfig.backgroundColor = "#FFFFFF";
        textConfig.color = "#000000";
        this.distanceText = this.add.text(0, 0, "DISTANCE: 0 METERS", textConfig).setOrigin(0);
        this.totalFishText = this.add.text(0, 30, "FISH CAUGHT: 0", textConfig);

        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            //go back to main menu
            menuMusic.stop();
            this.sound.play("menu_sfx");
            this.scene.start("menuScene");
        }
    }
}