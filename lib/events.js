/**
 * Copyright [2013] [runrightfast.co]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function() {
	'use strict';

	var events = require('events');
	var util = require('util');

	var EventEmitter = require('events').EventEmitter;

	var AsyncEventEmitter = function() {
		events.EventEmitter.call(this);
	};

	util.inherits(AsyncEventEmitter, EventEmitter);

	AsyncEventEmitter.prototype.emit = function(event) {
		if (EventEmitter.listenerCount(this, event) > 0) {
			var self = this;
			var args = arguments;
			setImmediate(function() {
				EventEmitter.prototype.emit.apply(self, Array.prototype.slice.call(args));
			});
		}
	};

	var Events = function() {
	};

	Events.prototype.AsyncEventEmitter = AsyncEventEmitter;

	var eventUtils = new Events();

	module.exports = eventUtils;

}());