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
	'views/search/forms/snippets-form-view',
	'views/search/forms/articles-form-view',
	'views/search/forms/journals-form-view',
	'views/search/forms/publishers-form-view',
	'utilities/web/query-string'
], function($, _, Template, BaseView, SnippetsFormView, ArticlesFormView, JournalsFormView, PublishersFormView, QueryString) {

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
		// searching methods
		//

		search: function() {
			window.location = 'results.html?' + QueryString.encode(this.getValues());
		},

		//
		// rendering methods
		//

		onRender: function() {
			var category = QueryString.getParam('category') || 'snippets';

			// show child views
			//
			switch (category) {
				case 'snippets':
					this.showChildView('form', new SnippetsFormView());
					break;
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

			// listen for key events 
			//
			$(window).on('keydown', (event) => {
				if (event.keyCode == 13) {
					this.$el.find('.btn-primary').trigger('click');
					event.stopPropagation();
					event.preventDefault();
				}
			});

			// clamp number input fields to min, max
			//
			this.$el.find('input[type="number"]').on('blur', function() {
				value = parseInt($(this).val());
				min = parseInt($(this).attr('min'));
				max = parseInt($(this).attr('max'));

				if (value < min) {
					$(this).val(min);
				} else if (value > max) {
					$(this).val(max);
				}
			});
		},

		onAttach: function() {
			this.getChildView('form').onAttach();
		},

		//
		// mouse event handling methods
		//

		onClickSearch: function() {
			this.$el.find('input[type="number"]').trigger('blur');
			this.search();
		},

		//
		// cleanup methods
		//

		onBeforeDestroy: function() {
			$(window).off('keydown');
		}
	});
});
