/******************************************************************************\
|                                                                              |
|                           dictionaries-form-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a dictionaries search form.        |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/search/forms/dictionaries-form.tpl',
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
				case 'dictionary':
					return this.$el.find('.dictionary-name input').val() || undefined;
			}
		},

		getValues: function() {
			return {
				dictionary: this.getValue('dictionary')
			};
		}
	});
});
