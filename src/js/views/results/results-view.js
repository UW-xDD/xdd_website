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
	'views/base-view',
	'views/results/snippets/snippets-list-view',
	'views/results/articles/articles-list-view',
	'views/results/journals/journals-list-view',
	'views/results/publishers/publishers-list-view',
	'utilities/web/query-string',
	'utilities/web/address-bar'
], function($, _, Template, Results, BaseView, SnippetsListView, ArticlesListView, JournalsListView, PublishersListView, QueryString, AddressBar) {
	
	//
	// querying methods
	//

	function isQuotated(string) {
		return string.charAt(0) == "'" || string.charAt(0) == '"';
	}

	function unQuotated(string) {
		return string.replace(/"/g, '').replace(/'/g, '');
	}

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
			delete items.max;
			delete items.max_per_page;
			return JSON.stringify(items).replace(/:/g, ': ').replace('{', '').replace('}', '').replace(/"/g, '').replace(/,/g, ', ').replace(/_/g, ' ');
		},

		getItems: function(data, pageNumber, maxPerPage) {
			var items = [];
			var first = (pageNumber - 1) * maxPerPage;
			var last = (pageNumber) * maxPerPage - 1;

			// clamp to data
			//
			if (last > data.length - 1) {
				last = data.length - 1;
			}

			// select items to display
			//
			var items = [];
			for (var i = first; i <= last; i++) {
				items.push(data[i]);
			}

			return items;
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

		searchApi(category, params) {
			this.showSpinner();

			// make request
			//
			$.ajax(this.api + '/' + category + '?' + QueryString.encode(params), {

				// callbacks
				//
				success: (data) => {
					this.hideSpinner();

					if (data.success && data.success.data) {
						this.data = data.success.data;

						// compute number of pages
						//
						this.numPages = Math.ceil(this.data.length / this.options.max_per_page);

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
					} else if (data.error) {

						// display error message
						//
						this.hideStatus();
						this.showMessage(data.error.message);
					} else {

						// display error message
						//
						this.hideStatus();
						this.showMessage('No search results.');	
					}
				},

				error: function() {

					// display error message
					//
					this.hideStatus();
					this.showMessage('No search results.');
				}
			}); 
		},

		searchSnippets: function(options) {
			var params = {};

			//
			// set API params
			//

 			if (options.max) {
				params.max = options.max;
			}

			if (options.terms) {
				params.term = options.terms;
			}

			// perform search
			//
			this.searchApi('snippets', params);
		},

		searchArticles: function(options) {
			var params = {};

			//
			// set API params
			//

 			if (options.max) {
				params.max = options.max;
			}

			if (options.title) {
				if (isQuotated(options.title)) {
					params.title = unQuotated(options.title);
				} else {
					params.title_like = options.title;
				}
			}

			if (options.author) {
				var names = options.author.split(' ');
				if (names.length > 1) {
        			params.firstname = names[0];
        			params.lastname = names[names.length - 1];
        		} else {
        			params.lastname = options.author;
        		}
        	}

 			if (options.publication) {
				params.pubname = options.publication;
			}

 			if (options.publisher) {
				params.publisher = options.publisher;
			}

 			if (options.published_after) {
				params.min_published = options.published_after;
			}

 			if (options.published_before) {
				params.max_published = options.published_before;
			}

 			if (options.acquired_after) {
				params.min_acquired = options.acquired_after;
			}

 			if (options.acquired_before) {
				params.max_acquired = options.acquired_before;
			}

			// perform search
			//
			this.searchApi('articles', params);
		},

		searchJournals: function(options) {
			var params = {};

			//
			// set API params
			//

			if (options.journal) {
				if (isQuotated(options.journal)) {
					params.journal = unQuotated(options.journal);
				} else {
					params.journal_like = options.journal;
				}
			} else {
				params.all = '';
			}

			if (options.publisher && options.publisher != 'undefined') {
				params.publisher = options.publisher;
			}

			// perform search
			//
			this.searchApi('journals', params);		
		},

		searchPublishers: function(options) {
			var params = {};

			//
			// set API params
			//

			if (options.publisher) {
				params.publisher = options.publisher;
			} else {
				params.all = '';
			}

			// perform search
			//
			this.searchApi('publishers', params);		
		},

		//
		// rendering methods
		//

		onRender: function() {
			var params = QueryString.decode(QueryString.get());
			var description = this.getSearchDescription(params);
			this.showDescription(description);

			switch (this.category) {
				case 'snippets':
					this.searchSnippets(this.options);
					break;
				case 'articles':
					this.searchArticles(this.options);
					break;
				case 'journals':
					this.searchJournals(this.options);
					break;
				case 'publishers':
					this.searchPublishers(this.options);
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
			var items = this.getItems(this.data, this.pageNumber, this.options.max_per_page);

			// display results
			//
			switch (this.category) {
				case 'snippets':
					this.showSnippets(new Results(items));
					break;
				case 'articles':
					this.showArticles(new Results(items));
					break;
				case 'journals':
					this.showJournals(new Results(items));
					break;
				case 'publishers':
					this.showPublishers(new Results(items));
					break;
			}

			// set starting line number
			//
			var start = (this.pageNumber - 1) * this.options.max_per_page + 1;
			this.$el.find('ol').attr('start', start);

			// show header
			//
			var finish = start + (this.options.max_per_page - 1);
			if (finish > this.data.length) {
				finish = this.data.length;
			}
			this.showResultsStatus(start, finish, this.data.length);
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

		//
		// mouse event handling methods
		//

		onClickSearchAgain: function() {
			window.location = '/search.html';
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
