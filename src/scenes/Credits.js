class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    create(){
        //graphics
        const graphics = this.add.graphics();

        graphics.fillGradientStyle(0xd77bba, 0xd77bba, 0x000000, 0x000000, 1);
        graphics.fillRect(0, 0, game.config.width, game.config.height);

        //text config
        textConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
        }

        this.add.text(width/2, height/6, "UNDERWATER PILOT", textConfig).setOrigin(0.5);
        textConfig.fontSize = "25px";
        this.add.text(width/2, height/3, "PROGRAMMING by Liza Gitelman", textConfig).setOrigin(0.5);
        this.add.text(width/2, height/2, "VISUAL ASSETS by Liza Gitelman", textConfig).setOrigin(0.5);
        this.add.text(width/2, height/3*2, "BACKGROUND MUSIC BY DAVID RENDA", textConfig).setOrigin(0.5);
        this.add.text(width/2, height/6*5, "SFX FROM PIXABAY", textConfig).setOrigin(0.5);
        textConfig.fontSize = "10px";
        this.add.text(width/2, height/3*2+20, "link: https://www.fesliyanstudios.com/royalty-free-music/download/8-bit-adventure/2282", textConfig).setOrigin(0.5)
        this.add.text(width/2, height/6*5+20, "game over: https://pixabay.com/sound-effects/8-bit-video-game-fail-version-2-145478/", textConfig).setOrigin(0.5)
        this.add.text(width/2, height/6*5+30, "menu change: https://pixabay.com/sound-effects/gameboy-pluck-41265/", textConfig).setOrigin(0.5)
        this.add.text(width/2, height/6*5+40, "menu navigate: https://pixabay.com/sound-effects/coin-collect-retro-8-bit-sound-effect-145251/", textConfig).setOrigin(0.5)
        this.add.text(width/2, height/6*5+50, "game start: https://pixabay.com/sound-effects/game-start-6104/", textConfig).setOrigin(0.5)
        this.add.text(width/2, height/6*5+60, "explosion: https://pixabay.com/sound-effects/8-bit-explosion1wav-14656/", textConfig).setOrigin(0.5)
        this.add.text(width/2, height-10, "BACKSPACE to return to menu", textConfig).setOrigin(0.5);

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