class GameOver extends Phaser.Scene {
    constructor(){
        super("gameoverScene");
    }

    create(){
        //replace high score if needed
        if (highScore.distance < score.distance){
            highScore.new = true;
            highScore.distance = score.distance;
        }
        if (highScore.totalFish < score.totalFish){
            highScore.new = true;
            highScore.totalFish = score.totalFish;
        }

        //text config
        textConfig = {
            fontFamily: "Courier",
            fontSize: "35px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
        }

        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

        this.bubbles = this.add.group();
        this.bubbleCounter = 0; //we want 100 rows of bubbles

        //create rows of bubbles
        this.placeBubble = this.time.addEvent({
            delay: 10,
            callback: () => {
                if(this.bubbleCounter < 100){
                    let i;
                    if(this.bubbleCounter%2 == 0){
                        i=0;
                    }
                    else {
                        i=1;
                    }
                    for(i; i<width; i+=30){
                        //spawn the actual row of bubbles
                        let bubble = this.physics.add.sprite(i, height, "bubble").setAlpha(0.5);
                        bubble.body.setVelocityY(-500);
                        this.bubbles.add(bubble);
                    }
                    this.bubbleCounter++;
                }
                if(this.bubbleCounter == 100){
                    this.add.text(20, height/4, "YOU LOST :(", textConfig).setOrigin(0);
                    textConfig.fontSize = "20px";
                    if (highScore.new){
                        //"new high score" text
                        this.add.text(20, height/3, "NEW HIGH SCORE!!");
                        highScore.new = false;
                    }
                    this.add.text(20, height/2, "Fish caught: " + score.totalFish, textConfig).setOrigin(0);
                    this.add.text(20, height/3*2, "Distance swam: " + score.distance + " m", textConfig).setOrigin(0);
                    this.add.text(width/2, height/2, "Most fish caught ever: " + highScore.totalFish, textConfig);
                    this.add.text(width/2, height/3*2, "Most distance covered ever: " + highScore.distance + " m", textConfig);
                    this.add.text(width/2, height/4*3, "Press BACKSPACE to return to Menu");
                    this.bubbleCounter++

                    score.totalFish = 0;
                    score.distance = 0;
                }
            },
            loop: true
        });
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyBACK)){
            //go back to main menu
            this.sound.play("menu_sfx");
            this.scene.start("menuScene");
        }
    }
}