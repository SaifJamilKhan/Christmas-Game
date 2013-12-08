//set main namespace
goog.provide('christmasgame');


//get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveBy');
// goog.require('christmasgame.Game');
var scene;
var giftLayer;
var HUDlayer;
var backGroundLayer;
var flyingObjectLayer;
var listOfGifts = [];
var numberOfGifts = 3;
var typesOfFlyingObjects = 7;
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

    var backGround = new lime.Sprite().setSize(1000,1000).setPosition(0,0).setFill('images/christmas_background.gif');
    backGroundLayer.appendChild(backGround);
    christmasgame.setUpObjectDetection(backGround);
    var btn = new lime.GlossyButton('Start').setSize(100, 40).setPosition(500, 50);
        goog.events.listen(btn, 'click', function() {
                    christmasgame.resetGame();
        });
    backGroundLayer.appendChild(btn);
    christmasgame.director.replaceScene(scene);
}

christmasgame.setUpObjectDetection = function(backGround){
     var listOfDetectedObjects;
    goog.events.listen(backGround,['mousedown','touchstart'],function(e){
         
        goog.events.listen(backGround, 'mousemove', function(f) {
            
             
            listOfDetectedObjects = christmasgame.findObjectsUnderPoint(f.position);
            //if(listOfDectedObjects[0]//console.log(f);
           // alert(listOfDetectedObjects);

 
            if(listOfDetectedObjects){
               // alert(listOfDetectedObjects);
                for(var y = 0; y < listOfDetectedObjects.length; y++){
                    var currentFlyingObject = listOfDetectedObjects[y];
                    // console.log(listOfDetectedObjects[y]);
                    if(currentFlyingObject.animations && currentFlyingObject.animations.length> 1){
                        break
                    }
                    if(currentFlyingObject.animations.length>0){
                        currentFlyingObject.animations[0].shouldEndAnimationList = true;
                        currentFlyingObject.animations[0].stop();
                        currentFlyingObject.animations.splice(0,1);
                        // console.log('stopped' + currentFlyingObject.animations[0]);
                    }
                    var scaleBig = new lime.animation.ScaleTo(1.5).setDuration(2);
                    christmasgame.runAnimationOn(scaleBig, currentFlyingObject);

                    console.log('ran big');
                    goog.events.listen(scaleBig,lime.animation.Event.STOP,function(){

                        var scaleSmall = new lime.animation.ScaleTo(1).setDuration(2);
                        goog.events.listen(scaleSmall,lime.animation.Event.STOP,function(){

                               var moveToBottom = new lime.animation.MoveTo(currentFlyingObject.position_.x, 600).setDuration(1);
                               goog.events.listen(moveToBottom,lime.animation.Event.STOP,function(){
                                currentFlyingObject.isMoving = false;
                               })
                               currentFlyingObject.runAction(moveToBottom);

                               console.log('ran bottom');
                               debugger;
                               christmasgame.runAnimationOn(moveToBottom, currentFlyingObject);
                         });
                       currentFlyingObject.runAction(scaleSmall);

                        console.log('ran small');
                       christmasgame.runAnimationOn(scaleSmall, currentFlyingObject);
                    });


                }
            }
        });

        goog.events.listen(backGround, ['mouseup','touchend','touchcancel'], function(e) {
             goog.events.unlisten(backGround, 'mousemove', function(){});
        });

    });
}

christmasgame.findObjectsUnderPoint = function(position){
    var listOfFoundObjects = [];
    for(var x =0; x< listOfGifts.length; x++){
        var gift = listOfGifts[x];
        for(var y = 0; y < gift.listOfFlyingObjects.length; y++){
            var flyingObject = gift.listOfFlyingObjects[y];
            if(flyingObject.isMoving){
                var objectRect = flyingObject.getBoundingBox();
                if(objectRect.contains(position)) listOfFoundObjects.push(flyingObject);
            }
        }
    }
    if(listOfFoundObjects.length >0) return listOfFoundObjects;
    return false;
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
        flyingObject.startPostion = {};
        flyingObject.startPostion.x = gift.position_.x;
        flyingObject.startPostion.y = gift.position_.y + 200;
        flyingObject.animations = [];
        flyingObject.flyingObjectCount = gift.flyingObjectCount;
        flyingObjectLayer.appendChild(flyingObject);
        listOfFlyingObjects.push(flyingObject);
    }
    gift.listOfFlyingObjects = listOfFlyingObjects;
    var flyingTimer= setTimeout(function(){ christmasgame.fireObjectFrom(gift)}, (500 * gift.id));
}

christmasgame.fireObjectFrom = function(gift){
    var randomNumberForFlyingObject = Math.floor((Math.random()*typesOfFlyingObjects)); 
    var lastFlyingObject = christmasgame.selectNonMovingRandomFlyingObject(gift, randomNumberForFlyingObject);
    var moveToTop = new lime.animation.MoveTo(lastFlyingObject.position_.x, 25 * randomNumberForFlyingObject + 50).setDuration(randomNumberForFlyingObject/4 + 1);
 
    goog.events.listen(moveToTop,lime.animation.Event.STOP,function(){
        if(!moveToTop.shouldEndAnimationList){

               console.log('evil move to bottom ran');
               debugger;
               console.log(moveToTop.shouldEndAnimationList);
               var moveToBottom = new lime.animation.MoveTo(lastFlyingObject.position_.x, 600).setDuration(randomNumberForFlyingObject/4 + 1);
               goog.events.listen(moveToBottom,lime.animation.Event.STOP,function(){
                lastFlyingObject.isMoving = false;
               });
                 christmasgame.runAnimationOn(moveToBottom, lastFlyingObject);
        }
    });
    christmasgame.runAnimationOn(moveToTop, lastFlyingObject);
    gift.listOfFlyingObjects.push(lastFlyingObject);
    gift.listOfFlyingObjects.splice(randomNumberForFlyingObject,1);
    setTimeout(function(){ christmasgame.fireObjectFrom(gift)}, 500 + (500 * randomNumberForFlyingObject));
}

christmasgame.runAnimationOn = function(animation, object){
    object.runAction(animation);
    // if(!object.animations) debugger;
    object.animations.push(animation);
    var index = object.length -1;
    goog.events.listen(animation,lime.animation.Event.STOP,function(){
        object.animations.splice(index,1);
    });
}

christmasgame.stopAllAnimatonsOn = function (object){
    // for each(var animation in object.animations){

    // }
}

christmasgame.selectNonMovingRandomFlyingObject = function(gift, randomNumberForFlyingObject){
    var lastFlyingObject = gift.listOfFlyingObjects[randomNumberForFlyingObject];
    while(lastFlyingObject.isMoving){
        randomNumberForFlyingObject = Math.floor((Math.random()*typesOfFlyingObjects)); 
        lastFlyingObject = gift.listOfFlyingObjects[randomNumberForFlyingObject];
    }
    lastFlyingObject.isMoving = true;
    return lastFlyingObject;
}

christmasgame.resetGame = function (){
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('christmasgame.start', christmasgame.start);