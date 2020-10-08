/******************************************************************************\
|                                                                              |
|                              term-item-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a single term item.                |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/results/lists/term-item.tpl',
	'views/base-view'
], function($, _, Template, BaseView) {

	return BaseView.extend({

		//
		// attributes
		//

		tagName: 'li',
		template: _.template(Template)
	});
});