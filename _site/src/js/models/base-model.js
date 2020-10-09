/******************************************************************************\
|                                                                              |
|                                   base-model.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a backbone base model.                        |
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
	
	return Backbone.Model.extend({

		//
		// querying methods
		//

		is: function(model) {
			return model && this.get(this.idAttribute) == model.get(model.idAttribute);
		}
	});
});
