/******************************************************************************\
|                                                                              |
|                             journals-list-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a list of journals.                |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'views/base-view',
	'views/collections/collection-view',
	'views/results/lists/journals/journal-item-view'
], function($, _, BaseView, CollectionView, JournalItemView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: JournalItemView,

		emptyView: BaseView.extend({
			template: _.template("No journals.")
		})
	});
});
