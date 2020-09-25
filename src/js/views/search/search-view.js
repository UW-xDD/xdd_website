/******************************************************************************\
|                                                                              |
|                                search-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a search interface.                |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/search/search.tpl',
	'views/base-view',
	'views/search/forms/articles-form-view',
	'views/search/forms/journals-form-view',
	'views/search/forms/publishers-form-view',
	'utilities/web/query-string'
], function($, _, Template, BaseView, ArticlesFormView, JournalsFormView, PublishersFormView, QueryString) {

	return BaseView.extend({

		//
		// attributes
		//

		template: _.template(Template),

		regions: {
			form: '.search-form'
		},

		events: {
			'click button.search': 'onClickSearch'
		},

		//
		// getting methods
		//

		getCategory: function() {
			return this.$el.find('.categories li.active').attr('class').replace('active', '').trim();
		},

		getMaxResults: function() {
			return this.$el.find('.max-results').val();
		},

		getMaxResultsPerPage: function() {
			return this.$el.find('.max-per-page').val();
		},

		getValues: function() {
			var category = this.getCategory();

			// concat category and form values for that category
			//
			return _.extend({
				category: category,
			}, this.getChildView('form').getValues(), {
				max: this.getMaxResults(),
				max_per_page: this.getMaxResultsPerPage()		
			});
		},

		//
		// rendering methods
		//

		onRender: function() {
			var category = QueryString.getParam('category') || 'articles';

			// show child views
			//
			switch (category) {
				case 'articles':
					this.showChildView('form', new ArticlesFormView());
					break;
				case 'journals':
					this.showChildView('form', new JournalsFormView());
					break;
				case 'publishers':
					this.showChildView('form', new PublishersFormView());
					break;
			}

			// set initial category
			//
			this.$el.find('.categories li.' + category).addClass('active');
		},

		//
		// mouse event handling methods
		//

		onClickSearch: function() {
        	window.location = 'results.html?' + QueryString.encode(this.getValues());
		}
	});
});
