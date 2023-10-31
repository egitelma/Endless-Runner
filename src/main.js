let config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 640,
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            // debug: true
        }
    },
    scene: [Menu, Play],
    backgroundColor: "#183d3c"
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;
let textConfig;
let cursors;

let { width, height } = game.config

// //custom menu vars
// let spaceshipCount, jetCount, customTime;

// //set UI sizes
// let borderUISize = game.config.height / 15;
// let borderPadding = borderUISize / 4;

// //high score
// let highScore = 0;

// Brainstorming: 
// You're a diver trying to avoid dangerous underwater creatures while collecting small ones for points. Collecting small fish increases the difficulty.
// The game saves Best Time and Most Fish.
// Creative Tilt: monsters can also emerge from your left, as in, start small and get bigger to chomp towards the player.
// Other creatures: tentacles from below, currents throw you in different directions.