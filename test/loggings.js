'use strict';
var expect = require('chai').expect;

var logging = require('../lib').logging;
var levels = require('log4js').levels;

describe('logging utils', function() {

	it('#getLogger - with a name', function() {
		var log = logging.getLogger('abc');
		expect(log).to.exist;
		expect(log.category).to.equal('abc');
		log.info('#getLogger - with a name');
	});

	it('#getLogger - with a name and logLevel', function() {
		var log = logging.getLogger('abc', 'DEBUG');
		expect(log).to.exist;
		expect(log.category).to.equal('abc');
		expect(log.level).to.equal(levels.DEBUG);
		log.debug('#getLogger - with a name and level');
	});

	it('#getLogger - with no params, returns default logger', function() {
		var log = logging.getLogger();
		expect(log).to.exist;
		log.info(log);
		log.debug('#getLogger - with no params, returns default logger');
	});
});