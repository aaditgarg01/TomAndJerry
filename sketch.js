var cat, mouse;
var cLay, cWa1, cWa2, cSit;
var mChs, mHnd, mTng, mGls;
var garden, gardenImg;

var WALK = 0;
var DONE = 1;
var gameState;

var WALKTIME = 15;
var walkTimer;

var WALKSPEED = 2;

function preload() {
    gardenImg = loadImage('garden.png');

    cLay = loadImage('cat1.png');
    cWa1 = loadImage('cat2.png');
    cWa2 = loadImage('cat3.png');
    cSit = loadImage('cat4.png');

    mChs = loadImage('mouse1.png');
    mHnd = loadImage('mouse2.png');
    mTng = loadImage('mouse3.png');
    mGls = loadImage('mouse4.png');
}

function setup(){
    createCanvas(975,705);

    garden = createSprite(487.5, 352.5);
    garden.addImage('bg', gardenImg);

    cat = createSprite(700, 570);
    cat.addImage('cat', cLay);
    cat.addAnimation('walk', cWa1, cWa2);
    cat.addImage('sit', cSit);
    cat.scale = 0.15;

    mouse = createSprite(200, 570);
    mouse.addImage('cheese', mChs);
    mouse.addAnimation('weird', mHnd, mTng);
    mouse.addImage('look', mGls);
    mouse.scale = 0.1;

    gameState = WALK;
    walkTimer = 0;
}

function draw() {
    background(255);
    
    walkTimer--;

    if (gameState == WALK)
    {
        if (walkTimer > 0)
        {
            cat.x -= WALKSPEED;
            cat.changeAnimation('walk');
            cat.scale = 0.2;

            mouse.changeAnimation('weird');
        }
        else
        {
            cat.changeImage('cat', cLay);
            cat.scale = 0.15;

            mouse.changeImage('cheese', mChs);
        }

        if (Math.abs(mouse.x - cat.x) <= ((cat.width*0.5*cat.scale) + (mouse.width*0.5*mouse.scale)))
        {
            gameState = DONE;
        }
    }

    if (gameState == DONE)
    {
        cat.changeImage('sit', cSit);
        mouse.changeImage('look', mGls);
    }

    drawSprites();
}


function keyPressed(){
    walkTimer = WALKTIME;

}
