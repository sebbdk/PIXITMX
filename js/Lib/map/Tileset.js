/* 
* @Author: kasperjensen
* @Date:   2014-02-14 00:18:36
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-02-14 14:09:31
*/

define(['PIXI'], function(PIXI) {

	return function(tileSets, map) {
		var self = this;

		self.sourceTextures = [];
		self.textures = [];

		self.getTileTexture = function(tid) {
			if(self.textures[tid]) {
				return self.textures[tid];
			} else {
				return self.createTileTexture(tid);
			}
		};

		self.createTileTexture = function(tid) {
			var activeSet = null;
			tileSets.forEach(function(tileset) {
				if(tid >= tileset.firstgid) {
					activeSet = tileset;
				}
			});

			if(activeSet === null) {
				throw "Attempted to get tile with a gid number that does not exist..";
			}

			//offset the tid so it is localto the active tilsheet
			localTid = tid - (activeSet.firstgid - 1);

			if(!self.sourceTextures[activeSet.firstgid]) {
				self.sourceTextures[activeSet.firstgid] = PIXI.Texture.fromImage(activeSet.image);
			}

			var tilesX = activeSet.imagewidth / activeSet.tilewidth;

			var x = (((localTid % tilesX)) -1 )  * activeSet.tilewidth;
			var y = (Math.ceil(localTid / tilesX) -1 ) * activeSet.tileheight;

			var tileTexture = new PIXI.Texture(self.sourceTextures[activeSet.firstgid],
				new PIXI.Rectangle(x, y, activeSet.tilewidth, activeSet.tileheight));

			self.textures[tid] = tileTexture;

			return tileTexture;
		};
	};

});