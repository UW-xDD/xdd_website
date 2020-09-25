/******************************************************************************\
|                                                                              |
|                            publishers-list-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a list of publishers.              |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'views/base-view',
	'views/collections/collection-view',
	'views/results/publishers/publisher-view'
], function($, _, BaseView, CollectionView, PublisherView) {
	return CollectionView.extend({

		//
		// attributes
		//

		tagName: 'ol',

		childView: PublisherView,

		emptyView: BaseView.extend({
			template: _.template("No publishers.")
		})
	});
});
