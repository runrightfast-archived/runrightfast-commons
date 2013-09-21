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
	var lodash = require('lodash');
	var Hoek = require('hoek');
	var assert = Hoek.assert;
	var log4js = require('log4js');

	module.exports = {
		getLogger : function(name, logLevel) {
			var logger = log4js.getLogger(name);
			if (!lodash.isUndefined(logLevel)) {
				assert(lodash.isString(logLevel) && log4js.levels[logLevel.toUpperCase()], 'logLevel must be a String set to one of the following values : '
						+ JSON.stringify(lodash.keys(log4js.levels)));
				logger.setLevel(logLevel.toUpperCase());
			}
			return logger;
		}
	};

}());