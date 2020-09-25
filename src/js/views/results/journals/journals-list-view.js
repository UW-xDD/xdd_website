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
	'views/results/journals/journal-view'
], function($, _, BaseView, CollectionView, JournalView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: JournalView,

		emptyView: BaseView.extend({
			template: _.template("No journals.")
		})
	});
});
