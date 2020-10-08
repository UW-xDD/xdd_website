/******************************************************************************\
|                                                                              |
|                           dictionaries-list-view.js                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a list of dictionaries.            |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'views/base-view',
	'views/collections/collection-view',
	'views/results/lists/dictionaries/dictionary-item-view'
], function($, _, BaseView, CollectionView, DictionaryItemView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: DictionaryItemView,

		emptyView: BaseView.extend({
			template: _.template("No dictionaries.")
		})
	});
});
