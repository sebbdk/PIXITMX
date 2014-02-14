/* 
* @Author: kasperjensen
* @Date:   2014-02-13 22:59:52
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-02-14 11:33:45
*/

define(['PIXI'], function(PIXI) {

	function myClass(layerData, map) {
		var self = this;
		self.layerData = layerData;

		PIXI.Graphics.call(this);

		parse();

		function parse() {
			var tiles = [];
			
			var index = 0;
			layerData.data.forEach(function(tid) {
				if(tid !== 0) {
					//calculate x and y coords
					var x = (index % map.mapData.width) * map.mapData.tilewidth;
					var y = Math.floor(index / map.mapData.width) * map.mapData.tileheight;
					//console.log(x,y,index);
					var texture = map.tileset.getTileTexture(tid);
					var sprite = new PIXI.Sprite(texture);
					sprite.position.x = x;
					sprite.position.y = y;
					self.addChild(sprite);
				}

				index++;
			});
		}
	}

	myClass.prototype = Object.create( PIXI.Graphics.prototype );
	myClass.prototype.constructor = myClass;

	return myClass;
});