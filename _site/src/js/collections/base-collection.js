/******************************************************************************\
|                                                                              |
|                                base-collection.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines a base collection and generic utility methods.      |
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
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	'use strict';
	
	return Backbone.Collection.extend({

		//
		// querying methods
		//

		contains: function(model) {
			for (let i = 0; i < this.length; i++) {
				if (this.at(i).is(model)) {
					return true;
				}
			}
			return false;
		},

		//
		// ordering methods
		//

		reverse: function() {
			let models = this.models;
			this.reset();
			this.add(models.reverse());
		}
	});
});