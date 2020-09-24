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
	'views/base-view',
	'views/results/articles/articles-list-view',
	'utilities/web/query-string'
], function($, _, Articles, BaseView, ArticlesListView, QueryString) {
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

		searchApi(category, options) {

			// set optional parameter defaults
			//
			if (!options) {
				options = {};
			}
			if (options.max == undefined) {
				options.max = 10;
			}

			// make request
			//
			$.ajax(this.api + '/' + category + '?' + QueryString.encode(options), {

				// callbacks
				//
				success: (data) => {
					if (data.success) {
						switch (category) {
							case 'articles':
								this.showArticles(new Articles(data.success.data));
						}
					} else if (data.error) {
						this.showMessage(data.error.message);
					}
				},

				error: function() {
					alert("Could not get search results.");
				}
			}); 
		},

		searchArticles: function(queryString) {
			var options = {};
			var params = QueryString.decode(queryString);

			if (params.title) {
				options.title = params.title;
			}

			if (params.author) {
				var names = params.author.split(' ');
				if (names.length > 1) {
        			options.firstname = names[0];
        			options.lastname = names[names.length - 1];
        		} else {
        			options.lastname = params.author;
        		}
        	}

			this.searchApi('articles', options);
		},

		//
		// rendering methods
		//

		onRender: function() {
			var category = QueryString.getParam('category');
			switch (category) {
				case 'articles':
					this.searchArticles(QueryString.get());
					break;
			}
		},

		showArticles(articles) {
			this.showChildView('results', new ArticlesListView({
				collection: articles
			}));
		},

		showMessage(message) {
			$('.message').html(message);
		}
	});
});
