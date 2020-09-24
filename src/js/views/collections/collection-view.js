/******************************************************************************\
|                                                                              |
|                              collection-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a base class for creating collection views.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
], function($, _, Backbone, Marionette) {
	'use strict';
	
	return Marionette.CollectionView;
});
