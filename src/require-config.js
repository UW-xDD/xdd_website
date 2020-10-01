
//
// configure require.js
//

require.config({

	// timeout
	//
	waitSeconds: 0,

	// cache busting
	//
	// urlArgs: 'version=1.0',

	// paths
	//
	baseUrl: 'src/js', 
	paths: {

		// top level paths
		//
		vendor: '../vendor',
		library: '../library',
		templates: '../../templates',

		// core library paths
		//
		text: '../library/require/text',
		jquery: '../library/jquery/jquery-3.4.1.min',
		underscore: '../library/underscore/underscore-min',
		backbone: '../library/backbone/backbone',
		'backbone.radio': '../library/backbone/radio/backbone.radio',
		marionette: '../library/backbone/marionette/backbone.marionette',
		bootstrap: '../../vendor/bootstrap/js/bootstrap'
	},

	shim: {
		
		//
		// jquery dependencies
		//

		jquery: {
			exports: '$'
		},

		//
		// backbone dependencies
		//

		underscore: {
			exports: '_'
		},

		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},

		marionette : {
			deps: ['jquery', 'underscore', 'backbone'],
			exports : 'Marionette'
		},

		//
		// bootstrap dependencies
		//

		bootstrap: { 
			deps: ['jquery'], 
			exports: 'bootstrap' 
		},
	}
});