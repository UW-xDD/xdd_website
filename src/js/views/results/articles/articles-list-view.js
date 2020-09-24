/******************************************************************************\
|                                                                              |
|                             articles-list-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a list of articles.                |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'views/base-view',
	'views/collections/collection-view',
	'views/results/articles/article-view'
], function($, _, BaseView, CollectionView, ArticleView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: ArticleView,

		emptyView: BaseView.extend({
			template: _.template("No articles.")
		})
	});
});
