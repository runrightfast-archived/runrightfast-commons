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

	it('#getLogger - with a name and invalid logLevel will throw an Error', function(done) {
		try {
			logging.getLogger('abc', 'DFSDFS');
			done(new Error('expected an error because the logLevel is not valid'));
		} catch (error) {
			// expected
			done();
		}

	});
	
	it('logging module will always return the same instance', function() {
		expect(require('../lib').logging).to.equal(require('../lib').logging);
	});
});