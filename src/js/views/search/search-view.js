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
	'bootstrap',
	'text!templates/search/search.tpl',
	'views/base-view',
	'views/search/forms/snippets-form-view',
	'views/search/forms/articles-form-view',
	'views/search/forms/journals-form-view',
	'views/search/forms/publishers-form-view',
	'utilities/web/query-string'
], function($, _, Bootstrap, Template, BaseView, SnippetsFormView, ArticlesFormView, JournalsFormView, PublishersFormView, QueryString) {

	return BaseView.extend({

		//
		// attributes
		//

		template: _.template(Template),

		regions: {
			form: '.search-form'
		},

		events: {
			'click .publishing.expander': 'onClickPublishingExpander',
			'click .dates.expander': 'onClickDatesExpander',
			'click .limits.expander': 'onClickLimitsExpander',
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

			// hide / show publishing expander
			//
			if (this.$el.find('.publishing.collapsible').length > 0) {
				this.$el.find('.publishing.expander').show();
			} else {
				this.$el.find('.publishing.expander').hide();
			}

			// hide / show dates expander
			//
			if (this.$el.find('.date.collapsible').length > 0) {
				this.$el.find('.dates.expander').show();
			} else {
				this.$el.find('.dates.expander').hide();
			}
		},

		onAttach: function() {
			this.getChildView('form').onAttach();

			// add expander button tooltips
			//
			this.addTooltips();
		},

		//
		// mouse event handling methods
		//

		onClickPublishingExpander: function() {
			if (!this.publishing_expanded) {
				this.$el.find('.publishing.collapsible').collapse('show');
				this.$el.find('.publishing.expander').addClass('active');
				this.publishing_expanded = true;
			} else {
				this.$el.find('.publishing.collapsible').collapse('hide');
				this.$el.find('.publishing.expander').removeClass('active');
				this.publishing_expanded = false;	
			}
			this.$el.find('.tooltip').remove();
		},

		onClickDatesExpander: function() {
			if (!this.dates_expanded) {
				this.$el.find('.date.collapsible').collapse('show');
				this.$el.find('.dates.expander').addClass('active');
				this.dates_expanded = true;
			} else {
				this.$el.find('.date.collapsible').collapse('hide');
				this.$el.find('.dates.expander').removeClass('active');	
				this.dates_expanded = false;	
			}
			this.$el.find('.tooltip').remove();
		},

		onClickLimitsExpander: function() {
			if (!this.limits_expanded) {
				this.$el.find('.num-results.collapsible').collapse('show');
				this.$el.find('.limits.expander').addClass('active');
				this.limits_expanded = true;
			} else {
				this.$el.find('.num-results.collapsible').collapse('hide');	
				this.$el.find('.limits.expander').removeClass('active');	
				this.limits_expanded = false;	
			}
			this.$el.find('.tooltip').remove();
		},

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
