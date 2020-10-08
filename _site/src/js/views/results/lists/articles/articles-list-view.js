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
	'views/results/lists/articles/article-item-view'
], function($, _, BaseView, CollectionView, ArticleItemView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: ArticleItemView,

		emptyView: BaseView.extend({
			template: _.template("No articles.")
		})
	});
});
