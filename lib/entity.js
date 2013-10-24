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

/**
 * An Entity has the following properties:
 * 
 * <code>
 * id					String - unique id - by default is a UUID
 * createdOn			Date
 * createdBy			String
 * updatedOn			Date
 * updatedBy			String
 * tags					Array - used to tag entities to enable searching entities on tags
 * _entityType  		String - used to identify the type of Object			
 * </code>
 */
(function() {
	'use strict';

	var uuid = require('./uuid');
	var lodash = require('lodash');
	var Hoek = require('hoek');
	var assert = Hoek.assert;

	var Entity = function Entity(props) {
		if (lodash.isObject(props)) {
			if (!lodash.isUndefined(props.id)) {
				assert(lodash.isString(props.id), 'id must be a String');
				this.id = props.id;
			} else {
				this.id = uuid();
			}

			if (!lodash.isUndefined(props.createdOn)) {
				if (lodash.isDate(props.createdOn)) {
					this.createdOn = props.createdOn;
				} else if (lodash.isString(props.createdOn)) {
					this.createdOn = new Date(props.createdOn);
					assert(!lodash.isNaN(this.createdOn.getTime()), "Expected date format for 'createdOn' is ISO 8061 extended format : " + props.createdOn);
				} else if (lodash.isNumber(props.createdOn)) {
					assert(!lodash.isNaN(props.createdOn), "Expected date format for 'createdOn' is number representing EPOC time : " + props.createdOn);
					this.createdOn = new Date(props.createdOn);
				} else {
					throw new Error("Invalid type for 'createdOn' : " + (typeof props.createdOn));
				}

			} else {
				this.createdOn = new Date();
			}

			if (!lodash.isUndefined(props.createdBy)) {
				assert(lodash.isString(props.createdBy), 'createdBy must be a String');
				this.createdBy = props.createdBy;
			}

			if (!lodash.isUndefined(props.updatedOn)) {
				if (lodash.isDate(props.updatedOn)) {
					this.updatedOn = props.updatedOn;
				} else if (lodash.isString(props.updatedOn)) {
					this.updatedOn = new Date(props.updatedOn);
					assert(!lodash.isNaN(this.updatedOn.getTime()), "Expected date format for 'updatedOn' is ISO 8061 extended format : " + props.updatedOn);
				} else if (lodash.isNumber(props.updatedOn)) {
					assert(!lodash.isNaN(props.updatedOn), "Expected date format for 'updatedOn' is number representing EPOC time : " + props.updatedOn);
					this.updatedOn = new Date(props.updatedOn);
				} else {
					throw new Error("Invalid type for 'updatedOn' : " + (typeof props.updatedOn));
				}
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

			if (!lodash.isUndefined(props._entityType)) {
				assert(lodash.isString(props._entityType), 'type must be a String');
				this._entityType = props._entityType;
			}
		} else {
			this.id = uuid();
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