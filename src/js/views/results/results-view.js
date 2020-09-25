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
	'collections/articles',
	'collections/journals',
	'collections/publishers',
	'views/base-view',
	'views/results/articles/articles-list-view',
	'views/results/journals/journals-list-view',
	'views/results/publishers/publishers-list-view',
	'utilities/web/query-string'
], function($, _, Articles, Journals, Publishers, BaseView, ArticlesListView, JournalsListView, PublishersListView, QueryString) {
	
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

		template: _.template('<div class="results"></div><div class="message"></div>'),

		regions: {
			results: '.results'
		},

		api: 'https://xdd.wisc.edu/api',

		//
		// searching methods
		//

		searchApi(category, params) {

			// set optional parameter defaults
			//
			if (!params) {
				params = {};
			}
			if (params.max == undefined) {
				params.max = 10;
			}

			// make request
			//
			$.ajax(this.api + '/' + category + '?' + QueryString.encode(params), {

				// callbacks
				//
				success: (data) => {
					if (data.success) {

						// display results
						//
						switch (category) {
							case 'articles':
								this.showArticles(new Articles(data.success.data));
								break;
							case 'journals':
								this.showJournals(new Journals(data.success.data));
								break;
							case 'publishers':
								this.showPublishers(new Publishers(data.success.data));
								break;
						}
					} else if (data.error) {

						// display error message
						//
						this.showMessage(data.error.message);
					}
				},

				error: function() {
					alert("Could not get search results.");
				}
			}); 
		},

		searchArticles: function(options) {
			var params = {};

			//
			// set API params
			//

			if (options.title) {
				params.title = options.title;
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
			}

			if (options.publisher) {
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
			}

			// perform search
			//
			this.searchApi('publishers', params);		
		},

		//
		// rendering methods
		//

		onRender: function() {
			var category = QueryString.getParam('category');
			var options = QueryString.decode(QueryString.get())

			switch (category) {
				case 'articles':
					this.searchArticles(options);
					break;
				case 'journals':
					this.searchJournals(options);
					break;
				case 'publishers':
					this.searchPublishers(options);
					break;
			}
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

		showMessage(message) {
			$('.message').html(message);
		}
	});
});
