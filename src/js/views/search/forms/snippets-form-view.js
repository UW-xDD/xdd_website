/******************************************************************************\
|                                                                              |
|                             snippets-form-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a snippets search form.            |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/search/forms/snippets-form.tpl',
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
				case 'terms':
					return this.$el.find('.terms input').val() || undefined;
			}
		},

		getValues: function() {
			return {
				terms: this.getValue('terms')
			};
		},

		//
		// rendering methods
		//

		templateContext: function() {
			return {
				terms: this.options.terms
			}
		}
	});
});
