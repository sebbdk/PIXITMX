/* 
* @Author: kasperjensen
* @Date:   2014-02-13 22:40:49
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-02-14 13:35:58
*/

define([
		'jquery',
		'mixin/EventDispatcher',
		'map/Tileset',
		'map/Imagelayer',
		'map/Objectlayer',
		'map/Tilelayer',
		'PIXI'],
		function(
			$,
			EventDispatcher,
			Tileset,
			Imagelayer,
			Objectlayer,
			Tilelayer,
			PIXI) {

	var Tilemap = function(path) {
		var self = this;
		self.mapData = null;
		self.layers = [];

		//extend the PIXI graphics object!
		PIXI.Graphics.call(this);

		//get the doc root
		var docRoot = path;
		docRoot = docRoot.split('/');
		docRoot.pop();
		self.docRoot = docRoot.join('/') + '/';

		//mix in some events
		EventDispatcher.mix(this);

		self.loadLevelData = function() {
			$.ajax(path, {
				type:'POST',
				dataType:'json'
			}).done(function(data, textStatus, jqXHR) {
				self.mapData = data;
				self.loadAssets();
				self.trigger('map_loaded', data);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				throw "The tilemap could not be loaded";
			});
		};

		self.loadAssets = function() {
			var assets = [];

			//load some tilesets!
			self.mapData.tilesets.forEach(function(tileset) {
				tileset.image = self.docRoot + tileset.image;
				assets.push(tileset.image);
			});

			//load image layers
			self.mapData.layers.forEach(function(layer) {
				if(layer.type === 'imagelayer') {
					layer.image = self.docRoot + layer.image;
					assets.push(layer.image);
				}
			});

			var loader = new PIXI.AssetLoader(assets);
			loader.onComplete = self.onAssetsLoaded;
			loader.load();
		};

		self.onAssetsLoaded = function() {
			self.trigger('assets_loaded');

			self.tileset = new Tileset(self.mapData.tilesets, self);

			self.mapData.layers.forEach(function(layer) {
				var displayLayer = null;
				switch(layer.type) {
					case 'imagelayer':
						displayLayer = new Imagelayer(layer);
						break;
					case 'tilelayer':
						displayLayer = new Tilelayer(layer, self);
						break;
					case 'objectgroup':
						displayLayer = new Objectlayer(layer, self);
						break;
					default:
						//#TODO
						break;
				}

				if(displayLayer !== null) {
					self.layers.push(displayLayer);
					self.addChild(displayLayer);
				}
			});
			
		};
	};

	Tilemap.prototype = Object.create( PIXI.Graphics.prototype );
	Tilemap.prototype.constructor = Tilemap;

	return Tilemap;
});