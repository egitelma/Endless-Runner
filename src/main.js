//Name: Liza Gitelman
//Game Title: Underwater Pilot
//Approximate Hours: god I think like 35. I spent days on this. had some wild errors
//Creative Tilt Justification:
//Technical: I'm proud of a lot of things, but particularly the lives' visual depiction. When damage is taken, the texture of the sprites themselves changes. It took me forever to figure out I could do that.
//          Also, the bomb explosion! It doesn't look like much, but figuring out how to disable the body of the sprite upon collision and *then* run the explosion animation was difficult.
//Visual: I made all the visual assets myself. Making the menu buttons was super fun! But I'm most proud of the diver's swimming animation. Didn't use a reference, just mimicked the movements of swimming and drew it. I really like how it turned out.
//          Not to keep also-ing, but also, the foreground seaweed, and figuring out how to get it to stay in the foreground. I'm proud of that.

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
    scene: [Menu, Play, Controls, Credits, GameOver],
    backgroundColor: "#183d3c"
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE, keyBACK;
let textConfig;
let cursors;

let { width, height } = game.config

//current score
let score = {
    distance: 0,
    totalFish: 0
}

//high score
let highScore = {
    distance: 0,
    totalFish: 0,
    new: false
}

//menu music
let menuMusic;

console.log("help")

// Brainstorming: 
// You're a diver trying to avoid dangerous underwater creatures while collecting small ones for points. Collecting small fish increases the difficulty.
// The game saves Best Time and Most Fish.
// Creative Tilt: monsters can also emerge from your left, as in, start small and get bigger to chomp towards the player.
// Other creatures: tentacles from below, currents throw you in different directions.

/*

DONE:
    Use multiple Scene classes (dictated by your game's style) (1)
        - Menu -> Play, Credits, Controls
        - Credits -> Menu
        - Controls -> Menu
        - Play -> GameOver
        - GameOver -> Menu
    Have some form of player input/control appropriate to your game design (1)
        - Move up and down with arrow keys
    Simulate scrolling with a tileSprite (or equivalent means) (1)
        - Foreground seaweed and background rocks
    Implement proper collision detection (via Arcade Physics or a custom routine) (1)
        - Fish and bombs
    Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
        - Random bomb drops, random sharks
    Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
        - Total distance & total fish gathered
    Be theoretically endless (1)
    Be playable for at least 15 seconds for a new player of low to moderate skill (1)
        - Hopefully?
    Include one or more animated characters that use a texture atlas* (1)
        - Diver
        - Nate told us that spritesheet = texture atlas for this assignment
    Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
    Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
        - Controls page
    Include in-game credits for all roles, assets, music, etc. (1)
        - Credits page
    Have looping background music* (1)
        - Thanks David Renda!
    Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
        - Select, Menu (menu change), Game Over, Bomb Explosion
    Run without significant crashes or errors (1)
    
*/
