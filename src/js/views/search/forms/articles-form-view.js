/******************************************************************************\
|                                                                              |
|                             articles-form-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying an articles search form.           |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/search/forms/articles-form.tpl',
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
				case 'title':
					return this.$el.find('.article-title input').val();
				case 'author':
					return this.$el.find('.author-name input').val();
				case 'publisher':
					return this.$el.find('.publisher-name input').val();
				case 'published_after':
					return this.$el.find('.publication-date .after input').val();
				case 'published_before':
					return this.$el.find('.publication-date .before input').val();
				case 'acquired_after':
					return this.$el.find('.acquisition-date .after input').val();
				case 'acquired_before':
					return this.$el.find('.acquisition-date .before input').val();
			}
		},

		getValues: function() {
			return {
				title: this.getValue('title'),
				author: this.getValue('author'),
				publisher: this.getValue('publisher'),
				published_after: this.getValue('published_after'),
				published_before: this.getValue('published_before'),
				acquired_after: this.getValue('acquired_after'),
				acquired_before: this.getValue('acquired_before')
			};
		}
	});
});
