class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image("diver", "./assets/diver.png");
        this.load.image("fish", "./assets/fish.png")
    }

    create(){
        //set up graphics
        // const graphics = this.add.graphics();

        // graphics.fillGradientStyle("#4dc9c6", "#4dc9c6", "#000000", "#000000");
        // graphics.fillRect(0, 0, game.config.width, game.config.height);
        
        this.player = new Diver(this, 48, game.config.height/2, "diver", 0).setScale(2);
        this.dangerProbability = 1; //probability that something dangerous will appear
        this.fish = []; //array of Fish objects on screen
        for (let i=0; i<game.settings.fishCount; i++){
        }
        
    }

    update(){

    }
}