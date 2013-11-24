//set main namespace
goog.provide('christmasgame');


//get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
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

    christmasgame.setUpBackground();
    christmasgame.setUpGifts();

    scene.appendChild(backGroundLayer);
    scene.appendChild(giftLayer);
    scene.appendChild(flyingObjectLayer);
    scene.appendChild(HUDlayer);

};

christmasgame.setUpBackground = function(){
   scene = new lime.Scene();
    backGroundLayer = new lime.Layer();
    flyingObjectLayer = new lime.Layer();
    HUDlayer = new lime.Layer();
    var backGround = new lime.Sprite().setSize(1000,1000).setPosition(0,0).setFill('images/christmas_background.gif');
    backGroundLayer.appendChild(backGround);

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
    // for(var x = 0; x < listOfGifts.length; x++){
    //     gift = listOfGifts[x].gift;
    //     gift.flyingTimer = setInterval(function(){
    //         christmasgame.fireObjectFrom(listOfGifts[x])
    //     }, 2000);;
    // }
      // var flyingTimer= setInterval(function(){christmasgame.fireObjectFrom(giftLayer)}, 2000);
    // flyingTimer.fire;


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

    var flyingTimer= setTimeout(function(){ setInterval(function(){christmasgame.fireObjectFrom(gift)}, 2000);}, (500 * gift.id));
    return gift;
    // christmasgame.startFlyingObjectsFrom(giftLayer);
    // setInterval(function(){alert("Hello")},3000);
    // var flyingTimer= setInterval(function(){christmasgame.fireObjectFrom(giftLayer)}, 2000);
    // gift.flyingTimer = setInterval(function(){
    //     christmasgame.fireObjectFrom(giftLayer)
    // }, 2000);
}

christmasgame.fireObjectFrom = function(gift){
    gift.flyingObjectCount = gift.flyingObjectCount % typesOfFlyingObjects;
    gift.flyingObjectCount++;
    var flyingObject = new lime.Sprite().setSize(100,100).setPosition(gift.position_).setFill('images/flyingObject'+gift.flyingObjectCount + '.png');
    flyingObjectLayer.appendChild(flyingObject);
    // for(var x =0; x < listOfGifts.length; x ++){
    //     var gift = listOfGifts[x].gift;
    //     debugger;
    //      console.log('fire from: ' + gift.id + 'with object Index' + gift.flyingObjectIndex + 'at x ' + x);
    // }
}
// christmasgame.setUpGifts = function(){
//     giftLayer = new lime.Layer();
//     var giftFrontLayer = new lime.Layer();

//     var gift = new lime.Sprite().setSize(100,100).setPosition(50,400).setFill('images/box.PNG');
//     gift.flyingObjectIndex = 0;
//     giftLayer.appendChild(gift);
//     var giftFront = new lime.Sprite().setSize(80,80).setPosition(50,420).setFill('images/box_front.png');
//     giftLayer.appendChild(giftFront);
//     giftLayer.giftOne = gift;

//     gift = new lime.Sprite().setSize(100,100).setPosition(200,400).setFill('images/box.PNG');
//     gift.flyingObjectIndex = 0;
//     giftLayer.appendChild(gift);
//     giftFront = new lime.Sprite().setSize(80,80).setPosition(200,420).setFill('images/box_front.png');
//     giftLayer.appendChild(giftFront);
//     giftLayer.giftTwo = gift;

//     gift = new lime.Sprite().setSize(100,100).setPosition(350,400).setFill('images/box.PNG');
//     gift.flyingObjectIndex = 0;
//     giftLayer.appendChild(gift);
//     giftFront = new lime.Sprite().setSize(80,80).setPosition(350,420).setFill('images/box_front.png');
//     giftLayer.appendChild(giftFront);
//     giftLayer.giftThree = gift;

//     scene.appendChild(giftLayer);
// }

christmasgame.resetGame = function (){
    giftLayer.
    flyingObject.flyingObjectIndex ++;
    flyingObject = new lime.Sprite().setSize(100,100).setPosition(350,400).setFill('images/box.PNG');
    giftLayer.appendChild(gift);
    giftFront = new lime.Sprite().setSize(80,80).setPosition(350,420).setFill('images/box_front.png');
    giftLayer.appendChild(giftFront);
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('christmasgame.start', christmasgame.start);