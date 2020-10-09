/******************************************************************************\
|                                                                              |
|                              terms-list-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a list of terms.                   |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'views/base-view',
	'views/collections/collection-view',
	'views/results/lists/terms/term-item-view'
], function($, _, BaseView, CollectionView, TermItemView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: TermItemView,

		emptyView: BaseView.extend({
			template: _.template("No terms.")
		})
	});
});
