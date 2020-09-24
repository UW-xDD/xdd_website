/******************************************************************************\
|                                                                              |
|                                   base-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract base class for creating views.               |
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
	'backbone',
	'marionette'
], function($, _, Backbone, Marionette) {
	'use strict';
	
	return Marionette.View.extend(_.extend({}, {

		//
		// querying methods
		//

		hasChildView: function(name) {
			return this.getChildView(name) != undefined;
		},

		getChildView: function(name) {
			if (this.getRegion(name)) {
				return this.getRegion(name).currentView;
			}
		},

		hasParentView: function(className) {
			if (this.$el.hasClass(className)) {
				return true;
			} else if (this.parent && this.parent.hasParentView) {
				return this.parent.hasParentView(className);
			} else {
				return false;
			}
		},

		getParentView: function(className) {
			if (this.$el.hasClass(className)) {
				return this;
			} else if (this.parent && this.parent.getParentView) {
				return this.parent.getParentView(className);
			}
		}
	}));
});
