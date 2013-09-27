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

var config = require('../lib').config;

describe('config', function() {

	it('can retrieve params from the command line', function() {
		process.argv = [ 'node', './index.js', '--PORT=8000' ];
		var port = parseInt(config.param('PORT', '8080'), 10);
		expect(port).to.equal(8000);
	});

	it('can retrieve params from the env if not specified on the command line', function() {
		process.argv = [ 'node', './index.js' ];
		process.env.PORT = '8000';
		var port = parseInt(config.param('PORT', '8080'), 10);
		expect(port).to.equal(8000);
	});

	it('returns the specified default value if the param is not specified on the command line and is not defined on process.env', function() {
		process.argv = [ 'node', './index.js' ];
		var port = parseInt(config.param('SERVER_PORT', '8080'), 10);
		expect(port).to.equal(8080);
	});
});