/******************************************************************************\
|                                                                              |
|                                 results-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a set of search results.           |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/results/results.tpl',
	'collections/results',
	'collections/snippets',
	'collections/articles',
	'collections/journals',
	'collections/publishers',
	'collections/terms',
	'collections/dictionaries',
	'views/base-view',
	'views/results/lists/snippets/snippets-list-view',
	'views/results/lists/articles/articles-list-view',
	'views/results/lists/journals/journals-list-view',
	'views/results/lists/publishers/publishers-list-view',
	'views/results/lists/terms/terms-list-view',
	'views/results/lists/dictionaries/dictionaries-list-view',
	'utilities/web/query-string',
	'utilities/web/address-bar'
], function($, _, Template, Results, Snippets, Articles, Journals, Publishers, Terms, Dictionaries, BaseView, SnippetsListView, ArticlesListView, JournalsListView, PublishersListView, TermsListView, DictionariesListView, QueryString, AddressBar) {
	return BaseView.extend({

		//
		// attributes
		//

		template: _.template(Template),

		regions: {
			results: '.results'
		},

		events: {
			'click .search-again': 'onClickSearchAgain',
			'click .first': 'onClickFirst',
			'click .prev': 'onClickPrev',
			'change .page-number': 'onChangePageNumber',
			'click .next': 'onClickNext',
			'click .last': 'onClickLast',
		},

		api: 'https://xdd.wisc.edu/api',

		//
		// constructor
		//

		initialize: function() {
			this.category = QueryString.getParam('category');
			this.options = QueryString.decode(QueryString.get());

			// parse options
			//
			if (this.options.page_number && typeof this.options.page_number == 'string') {
				this.options.page_number = parseInt(this.options.page_number);
			}
			if (this.options.page_number && typeof this.options.max_per_page == 'string') {
				this.options.max_per_page = parseInt(this.options.max_per_page);
			}

			// set defaults
			//
			if (!this.options.page_number) {
				this.options.page_number = 1;
			}
			if (!this.options.max_per_page) {
				this.options.max_per_page = 1000;
			}
		},

		//
		// querying methods
		//

		getSearchDescription: function(params) {
			var items = _.extend({}, params);

			// remove items that are not displayed
			//
			delete items.dataset;
			delete items.max;
			delete items.max_per_page;

			return JSON.stringify(items).replace(/:/g, ': ').replace('{', '').replace('}', '').replace(/"/g, '').replace(/,/g, ', ').replace(/_/g, ' ');
		},

		getPageNumber: function() {
			return this.$el.find('.page-number').val();
		},

		//
		// setting methods
		//

		setPageNumber: function(pageNumber) {

			// set attributes
			//
			this.pageNumber = pageNumber;

			// update url
			//
			var params = QueryString.decode(QueryString.get());
			if (pageNumber != 1) {
				params.page_number = pageNumber;
			} else {
				delete params.page_number;
			}
			var queryString = QueryString.encode(params);
			var state = window.history.state;
			var url = AddressBar.get('base') + '?' + queryString;
			window.history.pushState(state, '', url);

			// update display
			//
			this.showPageNumber(pageNumber);
			this.showResults();

			// scroll to top
			//
			window.scrollTo(0, 0);
		},

		//
		// searching methods
		//

		searchFor: function(items, options) {
			this.showSpinner();

			// search for items by options
			//
			items.search({
				data: options, 

				// callbacks
				//
				success: (collection) => {
					this.hideSpinner();

					if (collection.length > 0) {
						this.results = collection;

						// compute number of pages
						//
						this.numPages = Math.ceil(collection.length / this.options.max_per_page);

						// show / hide pager
						//
						if (this.numPages > 1) {
							this.$el.find('.page-controls').show();
						} else {
							this.$el.find('.page-controls').hide();
						}

						// update pager
						//
						this.showNumPages(this.numPages);

						// show results list
						//
						this.setPageNumber(this.options.page_number);
					} else {

						// display error message
						//
						this.hideStatus();
						this.showMessage('No search results.');	
					}
				},

				error: (response) => {

					if (response && response.message) {
						this.showMessage(response.message);
					}

					// display error message
					//
					this.hideStatus();
					this.showMessage('No search results.');
				}
			});
		},

		//
		// rendering methods
		//

		onRender: function() {
			var params = QueryString.decode(QueryString.get());
			var description = this.getSearchDescription(params);
			this.showDescription(description);

			// search for items
			//
			switch (this.category) {
				case 'snippets':
					this.searchFor(new Snippets(), params);
					break;
				case 'articles':
					this.searchFor(new Articles(), params);
					break;
				case 'journals':
					this.searchFor(new Journals(), params);
					break;
				case 'publishers':
					this.searchFor(new Publishers(), params);
					break;
				case 'terms':
					this.searchFor(new Terms(), params);
					break;
				case 'dictionaries':
					this.searchFor(new Dictionaries(), params);
					break;
			}

			// listen for key events 
			//
			$(window).on('keydown', (event) => {
				if (event.keyCode == 13) {
					this.$el.find('.btn-primary').trigger('click');
					event.stopPropagation();
					event.preventDefault();
				}
			});
		},

		showDescription: function(description) {
			this.$el.find('.search-terms').text(description);
		},

		showResults: function() {

			// get a single page of results
			//
			var items = this.results.slice(this.pageNumber, this.options.max_per_page);

			// render results list
			//
			switch (this.category) {
				case 'snippets':
					this.showSnippets(items);
					break;
				case 'articles':
					this.showArticles(items);
					break;
				case 'journals':
					this.showJournals(items);
					break;
				case 'publishers':
					this.showPublishers(items);
					break;
				case 'terms':
					this.showTerms(items);
					break;
				case 'dictionaries':
					this.showDictionaries(items);
					break;	
			}

			// set starting line number
			//
			var start = (this.pageNumber - 1) * this.options.max_per_page + 1;
			this.$el.find('ol').attr('start', start);

			// show header
			//
			var finish = start + (this.options.max_per_page - 1);
			if (finish > this.results.length) {
				finish = this.results.length;
			}
			this.showResultsStatus(start, finish, this.results.length);
		},

		showStatus: function() {
			this.$el.find('.status').show();
		},

		hideStatus: function() {
			this.$el.find('.status').hide();
		},

		showSpinner: function() {
			this.showStatus();
			this.$el.find('.search-status').show();
		},

		hideSpinner: function() {
			this.$el.find('.search-status').hide();
		},

		showResultsStatus: function(start, finish, count) {
			this.showStatus();
			this.hideSpinner();
			this.$el.find('.results-status').show();

			// show results index
			//
			this.$el.find('.start').text(start);

			// hide / show range
			//
			if (finish - start == count - 1) {
				this.$el.find('.range').hide();
			} else {
				this.$el.find('.range').show();
			}

			// hide / show end of range
			//
			if (start == finish) {
				this.$el.find('.range-end').hide();
			} else {
				this.$el.find('.range-end').show();
			}

			this.$el.find('.finish').text(finish);
			this.$el.find('.count').text(count);
		},

		showPageNumber: function(pageNumber) {
			this.$el.find('.page-number').val(pageNumber);
		},

		showNumPages: function(numPages) {
			this.$el.find('.num-pages').val(numPages);
		},

		showMessage(message) {
			$('.message').html(message);
		},

		//
		// results list rendering methods
		//

		showSnippets(snippets) {
			this.showChildView('results', new SnippetsListView({
				collection: snippets
			}));
		},

		showArticles(articles) {
			this.showChildView('results', new ArticlesListView({
				collection: articles
			}));
		},

		showJournals(journals) {
			this.showChildView('results', new JournalsListView({
				collection: journals
			}));
		},

		showPublishers(publishers) {
			this.showChildView('results', new PublishersListView({
				collection: publishers
			}));
		},

		showTerms(terms) {
			this.showChildView('results', new TermsListView({
				collection: terms
			}));
		},

		showDictionaries(dictionaries) {
			this.showChildView('results', new DictionariesListView({
				collection: dictionaries
			}));
		},

		//
		// mouse event handling methods
		//

		onClickSearchAgain: function() {
			window.location = '/search.html?' + QueryString.get();
		},

		onClickFirst: function() {
			this.setPageNumber(1);
		},

		onClickPrev: function() {
			let pageNumber = this.pageNumber - 1;
			if (pageNumber < 1) {
				pageNumber = this.numPages;
			}
			this.setPageNumber(pageNumber);
		},

		onChangePageNumber: function() {
			let pageNumber = Math.min(Math.max(parseInt(this.getPageNumber()), 1), this.numPages);
			this.setPageNumber(pageNumber);
		},

		onClickNext: function() {
			let pageNumber = this.pageNumber + 1;
			if (pageNumber > this.numPages) {
				pageNumber = 1;
			}
			this.setPageNumber(pageNumber);
		},

		onClickLast: function() {
			this.setPageNumber(this.numPages);
		}
	});
});
