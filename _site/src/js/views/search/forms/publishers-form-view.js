/******************************************************************************\
|                                                                              |
|                            publishers-form-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a publishers search form.          |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/search/forms/publishers-form.tpl',
	'views/forms/form-view'
], function($, _, Template, FormView) {

	return FormView.extend({

		//
		// attributes
		//

		template: _.template(Template),

		//
		// getting methods
		//

		getValue: function(key) {
			switch (key) {
				case 'publisher':
					return this.$el.find('.publisher-name input').val() || undefined;
			}
		},

		getValues: function() {
			return {
				publisher: this.getValue('publisher')
			};
		}
	});
});
