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
var lodash = require('lodash');
var uuid = require('uuid');

var Entity = require('..').Entity;

describe('Entity', function() {
	it('can be constructed with no params', function() {
		var entity = new Entity();

		expect(lodash.isString(entity.id)).to.equal(true);
		expect(lodash.isDate(entity.createdOn)).to.equal(true);

		console.log(entity);

	});

	it('can be constructed with valid params', function() {
		var params = {
			id : uuid.v4(),
			createdOn : new Date(),
			createdBy : 'Alfio',
			updatedOn : new Date(),
			updatedBy : 'Alfio',
			tags : [ 'tagA', 'tagB' ],
			type : 'config'
		};
		var entity = new Entity(params);

		expect(entity.id).to.equal(params.id);
		expect(entity.createdOn).to.equal(params.createdOn);
		expect(entity.createdBy).to.equal(params.createdBy);
		expect(entity.updatedBy).to.equal(params.updatedBy);
		expect(lodash.size(lodash.difference(entity.tags, params.tags))).to.equal(0);

		console.log(entity);

	});

	it('can be constructed with empty params', function() {
		var params = {};
		var entity = new Entity(params);

		expect(lodash.isString(entity.id)).to.equal(true);
		expect(lodash.isDate(entity.createdOn)).to.equal(true);

		console.log(entity);

	});

	it('#updated updates the updatedOn and optionally updatedBy', function() {
		var params = {};
		var entity = new Entity(params);

		expect(lodash.isString(entity.id)).to.equal(true);
		expect(lodash.isDate(entity.createdOn)).to.equal(true);

		console.log(entity);

		entity.updated();

		expect(lodash.isDate(entity.updatedOn)).to.equal(true);

		var before = entity.updatedOn.getTime();

		setTimeout(function() {
			entity.updated('Alfio');
			expect(entity.updatedOn.getTime() > before).to.equal(true);
			expect(entity.updatedBy).to.equal('Alfio');
		}, 1);

	});

	it("can handle 'createdOn' specified as a String in ISO 8601 extended format", function(done) {
		var now = new Date();
		var props = {
			createdOn : now.toISOString()
		};

		var entity = new Entity(props);
		expect(entity.createdOn.getTime()).to.equal(now.getTime());

		try {
			entity = new Entity({
				createdOn : 'INVALID DATE'
			});
			console.log('entity.createdOn.getTime() = ' + entity.createdOn.getTime());
			console.log(JSON.stringify(entity, undefined, 2));
			done(new Error('expected an Error to be thrown because createdOn is not a valid date'));
		} catch (err) {
			console.log(err);
			done();
		}
	});

	it("can handle 'createdOn' specified as EPOCH time", function(done) {
		var now = new Date();
		var props = {
			createdOn : now.getTime()
		};

		var entity = new Entity(props);
		expect(entity.createdOn.getTime()).to.equal(now.getTime());

		try {
			entity = new Entity({
				createdOn : NaN
			});
			console.log('entity.createdOn.getTime() = ' + entity.createdOn.getTime());
			console.log(JSON.stringify(entity, undefined, 2));
			done(new Error('expected an Error to be thrown because createdOn is not a valid date'));
		} catch (err) {
			console.log(err);
			done();
		}
	});

	it("can handle 'updatedOn' specified as a String in ISO 8601 extended format", function(done) {
		var now = new Date();
		var props = {
			updatedOn : now.toISOString()
		};

		var entity = new Entity(props);
		expect(entity.updatedOn.getTime()).to.equal(now.getTime());

		try {
			entity = new Entity({
				updatedOn : 'INVALID DATE'
			});
			console.log('entity.updatedOn.getTime() = ' + entity.updatedOn.getTime());
			console.log(JSON.stringify(entity, undefined, 2));
			done(new Error('expected an Error to be thrown because updatedOn is not a valid date'));
		} catch (err) {
			console.log(err);
			done();
		}
	});

	it("can handle 'updatedOn' specified as EPOCH time", function(done) {
		var now = new Date();
		var props = {
			updatedOn : now.getTime()
		};

		var entity = new Entity(props);
		expect(entity.updatedOn.getTime()).to.equal(now.getTime());

		try {
			entity = new Entity({
				updatedOn : NaN
			});
			console.log('entity.updatedOn.getTime() = ' + entity.updatedOn.getTime());
			console.log(JSON.stringify(entity, undefined, 2));
			done(new Error('expected an Error to be thrown because updatedOn is not a valid date'));
		} catch (err) {
			console.log(err);
			done();
		}
	});

});
