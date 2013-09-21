'use strict';
var expect = require('chai').expect;

var events = require('../lib').events;
var lodash = require('lodash');
var util = require('util');

describe('EventEmiiter', function() {

	it('emits events synchronously', function(done) {
		var eventEmitter = new events.AsyncEventEmitter();
		var counter = 0;
		eventEmitter.on('event', function() {
			console.log(counter);
			counter++;
			if (counter == 10) {
				done();
			}
		});

		for ( var i = 0; i < 10; i++) {
			eventEmitter.emit('event');
			console.log('emitted event : ' + i);
		}

		expect(counter).to.equal(0);

	});
});