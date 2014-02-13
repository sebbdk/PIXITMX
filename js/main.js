/* 
* @Author: kasperjensen
* @Date:   2014-02-13 22:10:36
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-02-13 22:31:24
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
requirejs([], function() {
	
});