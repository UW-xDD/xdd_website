/******************************************************************************\
|                                                                              |
|                                  results.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a collection of search results.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'models/result',
	'collections/base-collection',
	'utilities/web/query-string'
], function(Result, BaseCollection, QueryString) {
	'use strict';
	
	return BaseCollection.extend({

		//
		// attributes
		//

		model: Result,
		baseUrl: 'https://xdd.wisc.edu/api',

		//
		// querying methods
		//

		slice: function(pageNumber, maxPerPage) {
			var items = [];
			var first = (pageNumber - 1) * maxPerPage;
			var last = (pageNumber) * maxPerPage - 1;

			// clamp range to data
			//
			if (last > this.length - 1) {
				last = this.length - 1;
			}

			// select subset of collection
			//
			var items = [];
			for (var i = first; i <= last; i++) {
				items.push(this.at(i));
			}

			return new this.constructor(items);
		},

		//
		// string querying methods
		//

		isQuotated: function(string) {
			return string.charAt(0) == "'" || string.charAt(0) == '"';
		},

		unQuotated: function(string) {
			return string.replace(/"/g, '').replace(/'/g, '');
		},

		//
		// ajax methods
		//

		fetch: function(options) {

			// make request
			//
			$.ajax(this.baseUrl + '?' + QueryString.encode(options.data), {

				// callbacks
				//
				success: (data) => {
					if (data.success && data.success.data) {
						
						// parse model data into collection
						//
						this.reset(this.parse(data.success.data));
					}

					// perform callback
					//
					if (options.success) {
						options.success(this);
					}
				},

				error: (response) => {

					// perform callback
					//
					if (options.error) {
						options.error(response);
					}
				}
			}); 
		}
	});
});
