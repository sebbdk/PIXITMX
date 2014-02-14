/* 
* @Author: kasperjensen
* @Date:   2014-02-13 23:31:43
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-02-14 00:26:06
*/

define(['PIXI'], function(PIXI) {

	function myClass(layerData) {
		var self = this;
		self.layerData = layerData;

		PIXI.Graphics.call(this);

		var texture = PIXI.Texture.fromImage(layerData.image);
		var sprite = new PIXI.Sprite(texture);
		self.addChild(sprite);
	}

	myClass.prototype = Object.create( PIXI.Graphics.prototype );
	myClass.prototype.constructor = myClass;

	return myClass;

});