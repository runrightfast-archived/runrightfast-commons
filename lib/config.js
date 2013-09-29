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

	/**
	 * <pre>
	 * Get Command Line Arguments
	 * 
	 * This method allows you to retrieve the value of the specified command line argument.
	 *  
	 * The argument is case sensitive, and must be of the form: '--ARG_NAME=value'
	 * </pre>
	 * 
	 * @method _getCmdLineArg
	 * @param searchFor
	 *            {STRING} The argument name to search for
	 * @return {MIXED} FALSE if the argument was not found, the argument value
	 *         if found
	 */
	var getCmdLineArg = function getCmdLineArg(searchFor) {
		var cmdLineArgs = process.argv.slice(2, process.argv.length);
		var argName = '--' + searchFor + '=';
		var i = 0;
		for (i = 0; i < cmdLineArgs.length; i++) {
			if (cmdLineArgs[i].indexOf(argName) === 0) {
				return cmdLineArgs[i].substr(argName.length);
			}
		}

		return false;
	};

	var config = {
		/**
		 * <p>
		 * Get a parameter from the command line or process environment
		 * </p>
		 * 
		 * <p>
		 * This method looks for the parameter from the command line in the
		 * format --PARAMETER=VALUE, then from the process environment, then
		 * from the default specified as an argument.
		 * </p>
		 * 
		 * @method param
		 * @param paramName
		 *            {String} Name of the parameter
		 * @param [defaultValue]
		 *            {Any} Default value of the parameter
		 * @return {Any} The found value, or default value
		 */
		param : function(paramName, defaultValue) {
			return getCmdLineArg(paramName) || process.env[paramName] || defaultValue;
		}

	};

	module.exports = config;

}());
