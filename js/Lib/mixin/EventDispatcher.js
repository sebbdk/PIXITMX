/* 
* @Author: kasperjensen
* @Date:   2014-01-17 00:23:00
* @Last Modified by:   kasperjensen
* @Last Modified time: 2014-01-23 01:18:56
*
* A Javascript object mix
* 
* Mixes events dispatching to a object
*/

define(function () {
	this.mix = function(object) {
		var listeners = {};

		object.on = function(eventName, callback) {
			listeners[eventName] = listeners[eventName] ? listeners[eventName]:[];
			listeners[eventName].push(callback);
		};

		object.off = function(evenName, callback) {
			if(callback) {
				var index = listeners[eventName].indexOf(callback);
				if(index !== -1) {
					array.splice(index, 1);
				}
			} else {
				listeners[eventName] = [];
			}
		};

		object.trigger = function(eventName, data) {
			if(listeners[eventName]) {
				var event = {
					data:data,
					dispatcher:object
				};

				for(var c = 0; c < listeners[eventName].length; c++) {
					listeners[eventName][c](event);
				}
			}
		};
	};

	return this;
});