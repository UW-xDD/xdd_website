/******************************************************************************\
|                                                                              |
|                                 datasets.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a collection of datasets.                                     |
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
	'models/base-model',
	'collections/base-collection',
	'utilities/web/query-string'
], function(BaseModel, BaseCollection, QueryString) {
	'use strict';
	
	return BaseCollection.extend({

		//
		// attributes
		//

		model: BaseModel,
		baseUrl: 'https://xdd.wisc.edu/api/sets?all',

		//
		// ajax methods
		//

		fetch: function(options) {

			// make request
			//
			$.ajax(this.baseUrl, {

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
