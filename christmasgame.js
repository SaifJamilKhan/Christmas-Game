//set main namespace
goog.provide('christmasgame');


//get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
// goog.require('christmasgame.Game');
var scene;
var giftLayer;
var HUDlayer;
var backGroundLayer;
var flyingObjectLayer;
var listOfGifts = [];
var numberOfGifts = 3;
var typesOfFlyingObjects = 5;
var ObjectEnum = {
    Player1: 1,
    Player2: 2,
    Draw: 0
};
// entrypoint
christmasgame.start = function(){

// lime.scheduleManager.setDisplayRate(1000 / 60);

    christmasgame.director = new lime.Director(document.body, 1024, 768);
        scene = new lime.Scene(),
        layer = new lime.Layer();


        var btn = new lime.GlossyButton('Start').setSize(100, 40).setPosition(150, 100);
        goog.events.listen(btn, 'click', function() {
                christmasgame.newgame(1);
        });
        layer.appendChild(btn);

    scene.appendChild(layer);

    christmasgame.director.makeMobileWebAppCapable();
    // set current scene active
    christmasgame.director.replaceScene(scene);

}

christmasgame.newgame = function(mode) {
    backGroundLayer = new lime.Layer();
    flyingObjectLayer = new lime.Layer();
    HUDlayer = new lime.Layer();

    christmasgame.setUpBackground();
    christmasgame.setUpGifts();

    scene.appendChild(backGroundLayer);
    scene.appendChild(giftLayer);
    scene.appendChild(flyingObjectLayer);
    scene.appendChild(HUDlayer);

};

christmasgame.setUpBackground = function(){
   scene = new lime.Scene();

    // var backGround = new lime.Sprite().setSize(1000,1000).setPosition(0,0).setFill('images/christmas_background.gif');
    // backGroundLayer.appendChild(backGround);
    var btn = new lime.GlossyButton('Start').setSize(100, 40).setPosition(500, 50);
        goog.events.listen(btn, 'click', function() {
                    christmasgame.resetGame();
        });
    backGroundLayer.appendChild(btn);
    christmasgame.director.replaceScene(scene);
}

christmasgame.setUpGifts = function(){

    giftLayer = new lime.Layer();
    listOfGifts.push(christmasgame.setUpGift(50,400, 1));
    listOfGifts.push(christmasgame.setUpGift(200,400, 2));
    listOfGifts.push(christmasgame.setUpGift(350,400, 3));
}

christmasgame.setUpGift = function(postitionx, postitiony, id){
    var gift = new lime.Sprite().setSize(100,100).setPosition(postitionx, postitiony).setFill('images/box.PNG');
    gift.id = id;
    console.log('id set to' + gift.id);
    gift.flyingObjectCount = 0;
    giftLayer.appendChild(gift);
    giftLayer.gift = gift;
    var giftFront = new lime.Sprite().setSize(80,80).setPosition(postitionx, postitiony +20).setFill('images/box_front.png');
    HUDlayer.appendChild(giftFront);
    christmasgame.setUpFlyingObjectsFrom(gift, 15);
    return gift;
}


christmasgame.setUpFlyingObjectsFrom = function(gift, numberOfObjects){
    var listOfFlyingObjects = [];

    for(var x =0; x < numberOfObjects; x++){
        gift.flyingObjectCount = gift.flyingObjectCount % typesOfFlyingObjects;
        gift.flyingObjectCount++;
        var flyingObject = new lime.Sprite().setSize(100,100).setPosition(gift.position_.x, gift.position_.y + 200).setFill('images/flyingObject'+gift.flyingObjectCount + '.png');
        flyingObject.flyingObjectCount = gift.flyingObjectCount;
        flyingObjectLayer.appendChild(flyingObject);
        listOfFlyingObjects.push(flyingObject);
    }
    gift.listOfFlyingObjects = listOfFlyingObjects;
    var flyingTimer= setTimeout(function(){ christmasgame.fireObjectFrom(gift)}, (500 * gift.id));
}

christmasgame.fireObjectFrom = function(gift){
    var randomNumberForFlyingObject = Math.floor((Math.random()*typesOfFlyingObjects)); 
    var lastFlyingObject = christmasgame.selectNonMovingRandomFunction(gift, randomNumberForFlyingObject);
    var moveToTop = new lime.animation.MoveTo(lastFlyingObject.position_.x, 50 * randomNumberForFlyingObject + 100).setDuration(randomNumberForFlyingObject/4 + 1);
    goog.events.listen(moveToTop,lime.animation.Event.STOP,function(){
      // lastFlyingObject.setPosition(lastFlyingObject.position_.x, 600);
       var moveToBottom = new lime.animation.MoveTo(lastFlyingObject.position_.x, 600).setDuration(randomNumberForFlyingObject/4 + 1);
       goog.events.listen(moveToBottom,lime.animation.Event.STOP,function(){
        lastFlyingObject.isMoving = false;
       });
       lastFlyingObject.runAction(moveToBottom);
    });

    lastFlyingObject.runAction(moveToTop);
    gift.listOfFlyingObjects.push(lastFlyingObject);
    gift.listOfFlyingObjects.splice(randomNumberForFlyingObject,1);
    setTimeout(function(){ christmasgame.fireObjectFrom(gift)}, 1000 + (1000 * randomNumberForFlyingObject));
}

christmasgame.selectNonMovingRandomFunction = function(gift, randomNumberForFlyingObject){

    var lastFlyingObject = gift.listOfFlyingObjects[randomNumberForFlyingObject];
    while(lastFlyingObject.isMoving){
        console.log('its this');
        randomNumberForFlyingObject = Math.floor((Math.random()*typesOfFlyingObjects)); 
        lastFlyingObject = gift.listOfFlyingObjects[randomNumberForFlyingObject];
    }
    lastFlyingObject.isMoving = true;
    return lastFlyingObject;
}

christmasgame.resetGame = function (){
    var moveToTop = new lime.animation.MoveBy(0,-50).setDuration(2);
    // setTimeout(function(){
    listOfGifts[1].runAction(moveToTop);
        // goog.events.listen(moveToTop,lime.animation.Event.STOP,function(){
        //     // scene.removeChild(flyingObject);
        // //     flyingObject = null;
        // })
    // }, 1);

    return;
    //clear all variables, remove all sprites, and 
    giftLayer.
    flyingObject.flyingObjectIndex ++;
    flyingObject = new lime.Sprite().setSize(100,100).setPosition(350,400).setFill('images/box.PNG');
    giftLayer.appendChild(gift);
    giftFront = new lime.Sprite().setSize(80,80).setPosition(350,420).setFill('images/box_front.png');
    giftLayer.appendChild(giftFront);
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('christmasgame.start', christmasgame.start);