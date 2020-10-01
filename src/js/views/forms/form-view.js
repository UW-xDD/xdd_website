/******************************************************************************\
|                                                                              |
|                                   form-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a single search result.            |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'views/base-view'
], function($, _, BaseView) {

	return BaseView.extend({

		//
		// attributes
		//

		tagName: 'form',

		//
		// rendering methods
		//

		templateContext: function() {
			return this.options || {};
		},
		
		onAttach: function() {

			// focus / highlight first input element
			//
			this.$el.find('.form-group:first-child input').focus();
		}
	});
});
