/******************************************************************************\
|                                                                              |
|                                 articles.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a collection of articles search results.                      |
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

		baseUrl: Results.prototype.baseUrl + '/articles',
		
		//
		// searching methods
		//

		search: function(options) {
			var params = {};

			// set API params from options
			//
			if (options.data) {

				// set dataset param
				//
				if (options.data.dataset) {
					params.dataset = options.data.dataset;
				}

				// set limit param
				//
				if (options.data.max) {
					params.max = options.data.max;
				}

				// set title param
				//
				if (options.data.title) {
					if (this.isQuotated(options.data.title)) {
						params.title = this.unQuotated(options.data.title);
					} else {
						params.title_like = options.data.title;
					}
				}

				// set author name params
				//
				if (options.data.author) {
					var names = options.data.author.split(' ');
					if (names.length > 1) {
						params.firstname = names[0];
						params.lastname = names[names.length - 1];
					} else {
						params.lastname = options.data.author;
					}
				}

				// set article publishing params
				//
				if (options.data.publication) {
					params.pubname = options.data.publication;
				}
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
