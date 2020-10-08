/******************************************************************************\
|                                                                              |
|                                 snippets.js                                  |
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
	'collections/results'
], function(Results) {
	'use strict';
	
	return Results.extend({

		//
		// attributes
		//

		baseUrl: Results.prototype.baseUrl + '/snippets',
		
		//
		// searching methods
		//

		search: function(options) {
			var params = {};

			//
			// set API params
			//

			if (options.data) {

				// set dataset
				//
				if (options.data.dataset) {
					params.dataset = options.data.dataset;
				}
				
				// set article limit param
				//
	 			if (options.data.max) {
					params.article_limit = options.data.max;
				}

				// set article terms param
				//
				if (options.data.terms) {
					params.term = options.data.terms;
				}

				// set article publising params
				//
	 			if (options.data.publisher) {
					params.publisher = options.data.publisher;
				}
	 			if (options.data.published_after) {
					params.min_published = options.data.published_after;
				}
	 			if (options.data.published_before) {
					params.max_published = options.data.published_before;
				}
	 			if (options.data.acquired_after) {
					params.min_acquired = options.data.acquired_after;
				}
	 			if (options.data.acquired_before) {
					params.max_acquired = options.data.acquired_before;
				}
			}
			
			// perform search
			//
			this.fetch({
				data: params,
				success: options.success,
				error: options.error
			});
		},
	});
});
