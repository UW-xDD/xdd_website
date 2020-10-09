/******************************************************************************\
|                                                                              |
|                               terms-form-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a terms search form.               |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/search/forms/terms-form.tpl',
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
				case 'term':
					return this.$el.find('.term input').val() || undefined;
				case 'dictionary':
					return this.$el.find('.dictionary-name input').val() || undefined;
				case 'publisher':
					return this.$el.find('.publisher-name input').val() || undefined;
			}
		},

		getValues: function() {
			return {
				term: this.getValue('term'),
				dictionary: this.getValue('dictionary'),
				publisher: this.getValue('publisher')
			};
		},

		//
		// rendering methods
		//

		templateContext: function() {
			return _.extend({
				term: this.options.terms
			}, this.options);
		}
	});
});
