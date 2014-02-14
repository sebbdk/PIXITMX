/* 
* @Author: kasperjensen
* @Date:   2014-02-14 13:27:08
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-02-14 13:36:45
*/

define(['PIXI'], function(PIXI) {

	function myClass(layerData, map) {
		var self = this;
		self.layerData = layerData;

		PIXI.Graphics.call(this);

		layerData.objects.forEach(function(object) {
			if(object.visible) {
				self.beginFill(0xff0000);
				self.drawRect(object.x, object.y, object.width, object.height);
				self.endFill();
			}
		});
	}

	myClass.prototype = Object.create( PIXI.Graphics.prototype );
	myClass.prototype.constructor = myClass;

	return myClass;

});