/******************************************************************************\
|                                                                              |
|                             snippets-list-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a list of snippets.                |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'views/base-view',
	'views/collections/collection-view',
	'views/results/lists/snippets/snippet-item-view'
], function($, _, BaseView, CollectionView, SnippetItemView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: SnippetItemView,

		emptyView: BaseView.extend({
			template: _.template("No snippets.")
		})
	});
});
