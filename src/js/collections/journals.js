/******************************************************************************\
|                                                                              |
|                                 journals.js                                  |
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

		baseUrl: Results.prototype.baseUrl + '/journals',


		//
		// searching methods
		//

		search: function(options) {
			var params = {};

			//
			// set API params
			//

			if (options.data) {

				// set journal name param
				//
				if (options.data.journal) {
					if (this.isQuotated(options.data.journal)) {
						params.journal = this.unQuotated(options.data.journal);
					} else {
						params.journal_like = options.data.journal;
					}
				} else {
					params.all = true;
				}

				// set journal publishing param
				//
				if (options.data.publisher && options.data.publisher != 'undefined') {
					params.publisher = options.data.publisher;
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
