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

	var uuid = require('uuid');
	var lodash = require('lodash');
	var Hoek = require('hoek');
	var assert = Hoek.assert;

	var Entity = function Entity(props) {
		if (lodash.isObject(props)) {
			if (!lodash.isUndefined(props.id)) {
				assert(lodash.isString(props.id), 'id must be a String');
				this.id = props.id;
			} else {
				this.id = uuid.v4();
			}

			if (!lodash.isUndefined(props.createdOn)) {
				assert(lodash.isDate(props.createdOn), 'createdOn must be a Date');
				this.createdOn = props.createdOn;
			} else {
				this.createdOn = new Date();
			}

			if (!lodash.isUndefined(props.createdBy)) {
				assert(lodash.isString(props.createdBy), 'createdBy must be a String');
				this.createdBy = props.createdBy;
			}

			if (!lodash.isUndefined(props.updatedOn)) {
				assert(lodash.isDate(props.updatedOn), 'updatedOn must be a Date');
				this.updatedOn = props.updatedOn;
			} else {
				this.updatedOn = new Date();
			}

			if (!lodash.isUndefined(props.updatedBy)) {
				assert(lodash.isString(props.updatedBy), 'updatedBy must be a String');
				this.updatedBy = props.updatedBy;
			}

			if (!lodash.isUndefined(props.tags)) {
				assert(lodash.isArray(props.tags), 'tags must be an Array');
				this.tags = props.tags;
			}

			if (!lodash.isUndefined(props.type)) {
				assert(lodash.isString(props.type), 'type must be a String');
				this.type = props.type;
			}
		} else {
			this.id = uuid.v4();
			this.createdOn = new Date();
			this.updatedOn = this.createdOn;
		}
	};

	Entity.prototype.updated = function(updatedBy) {
		if (!lodash.isUndefined(updatedBy)) {
			assert(lodash.isString(updatedBy), 'updatedBy must be a String');
			this.updatedBy = updatedBy;
		}
		this.updatedOn = new Date();
	};

	module.exports = Entity;
}());