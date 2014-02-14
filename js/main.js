/* 
* @Author: kasperjensen
* @Date:   2014-02-13 22:10:36
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-02-14 13:28:33
*/

/**
 * RequireJS configuration
 * 
 * Configure libraries for use with 
 * requirejs AMD(Asynchronous Module Definition) style loading ,and their dependensies.
 */
requirejs.config({
	shim:{
		'PIXI': {
			exports: 'PIXI'
		},
		'backbone': {
			deps: ['underscore'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'socketio': {
			exports: 'io'
		}
	},
	baseUrl:'js/Lib',
	paths: {
		'underscore':'../vendor/underscore/underscore',
		'backbone':'../vendor/backbone/backbone',
		'jquery':'../vendor/jquery/jquery',
		'PIXI':'../vendor/pixi/bin/pixi'
	}
});

/**
 * Action!
 * this is where the application logic starts
 */
requirejs(['map/Tilemap', 'PIXI'], function(Tilemap, PIXI) {

	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x66FF99);

	// create a renderer instance
	var renderer = PIXI.autoDetectRenderer(400, 300);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	var map = new Tilemap('maps/demo_level/simple.json');
	map.loadLevelData();
	stage.addChild(map);

	function animate() {
		requestAnimFrame( animate );

		// render the stage
		renderer.render(stage);
	}

	animate();
});