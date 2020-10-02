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
				case 'publisher':
					return this.$el.find('.publisher-name input').val() || undefined;
				case 'published_after':
					return this.$el.find('.publication-date input.after').val() || undefined;
				case 'published_before':
					return this.$el.find('.publication-date input.before').val() || undefined;
				case 'acquired_after':
					return this.$el.find('.acquisition-date input.after').val() || undefined;
				case 'acquired_before':
					return this.$el.find('.acquisition-date input.before').val() || undefined;
			}
		},

		getValues: function() {
			return {
				terms: this.getValue('terms'),
				publisher: this.getValue('publisher'),
				published_after: this.getValue('published_after'),
				published_before: this.getValue('published_before'),
				acquired_after: this.getValue('acquired_after'),
				acquired_before: this.getValue('acquired_before')
			};
		},

		//
		// rendering methods
		//

		templateContext: function() {
			return _.extend({
				terms: this.options.terms
			}, this.options);
		}
	});
});
