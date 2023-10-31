class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){

    }

    create(){
        //set up graphics
        const graphics = this.add.graphics();

        graphics.fillGradientStyle(0x4dc9c6, 0x4dc9c6, 0x000000, 0x000000, 1);
        graphics.fillRect(0, 0, game.config.width, game.config.height);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            game.settings = {
                fishCount: 2
            }
            this.scene.start("playScene");
        }
    }
}