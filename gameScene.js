goog.provide('christmasgame.Game');


//get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');

// entrypoint
christmasgame.Game = function() {
    debugger;
    lime.Sprite.call(this);
    var someLayer = new lime.Layer;
    var btn = new lime.GlossyButton('Back').setSize(100, 40).setPosition(150, 100);
    someLayer.appendChild(btn);
    // return someLayer;
}
// goog.inherits(pong.Game, lime.Sprite);


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
// goog.exportSymbol('christmasgame.start', christmasgame.start);