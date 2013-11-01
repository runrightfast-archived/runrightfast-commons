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

'use strict';
var expect = require('chai').expect;

var events = require('../lib').events;
var lodash = require('lodash');
var util = require('util');

describe('EventEmiiter', function() {

	it('emits events synchronously', function(done) {
		var eventEmitter = new events.AsyncEventEmitter();
		var counter = 0;
		var i;
		eventEmitter.on('event', function() {
			console.log(counter);
			counter++;
			if (counter === 10) {
				done();
			}
		});

		for (i = 0; i < 10; i++) {
			eventEmitter.emit('event');
			console.log('emitted event : ' + i);
		}

		expect(counter).to.equal(0);

	});

	it('events module will always return the same instance', function() {
		expect(require('../lib').events).to.equal(require('../lib').events);
	});
});