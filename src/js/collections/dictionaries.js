/******************************************************************************\
|                                                                              |
|                               dictionaries.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a collection of dictionaries search results.                  |
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

		baseUrl: Results.prototype.baseUrl + '/dictionaries',
		
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
				
				// set dictionary name param
				//
				if (options.data.dictionary) {
					params.dictionary = options.data.dictionary;
				} else {
					params.all = true;
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
