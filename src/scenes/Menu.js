class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load sfx/background music

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create(){
        //place tile sprite/set up bg?

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