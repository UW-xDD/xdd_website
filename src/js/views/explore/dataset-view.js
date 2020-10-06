/******************************************************************************\
|                                                                              |
|                               dataset-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying a search interface.                |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'bootstrap',
	'text!templates/explore/dataset.tpl',
	'views/base-view'
], function($, _, Bootstrap, Template, BaseView) {

	return BaseView.extend({

		//
		// attributes
		//

		className: 'col-sm-6',
		template: _.template(Template),

		events: {
			'click .panel': 'onClickPanel',
			'click .details-expander': 'onClickDetailsExpander',
			'click .links-expander': 'onClickLinksExpander'
		},


		//
		// rendering methods
		//

		toHTML: function(string) {
			var words = string.split(' ');

			// break text into words
			//
			for (var i = 0; i < words.length; i++) {
				var word = words[i];

				// show urls as links
				//
				if (word.startsWith('http://') || word.startsWith('https://') || word.startsWith('www.')) {
					words[i] = '<a href="' + word + '" target="_blank">' + word + '</a>';
				}
			}
			return words.join(' ');
		},

		templateContext: function() {
			return {
				description: this.toHTML(this.model.get('description')),
				index: this.options.index
			}
		},

		onRender: function() {
			var name = this.model.get('name');

			// add styling to panel
			//
			if (name == 'xdd-covid-19' || name == 'cord-19') {
				this.$el.find('.panel').addClass('covid');
			}

			// show additional info
			//
			this.showDetails();
			this.showLinks();
		},


		showDetails: function() {
			var details = this.model.get('details');

			// show details
			//
			if (details) {
				this.$el.find('.details p').html(this.toHTML(details));

				// show expander button
				//
				this.$el.find('.details-expander').show();
			}
		},

		showLinks: function() {
			var links = this.model.get('links');

			// show links
			//
			if (links && links.length > 0) {

				// show links list
				//
				for (var j = 0; j < links.length; j++) {
					var link = links[j];
					$link = $('<li><a href="' + link.url + '" target="_blank">' + link.name + '</a>' + link.description + '</li>');
					this.$el.find('.links ol').append($link);
				}

				// show expander button
				//
				this.$el.find('.links-expander').show();
			}
		},

		//
		// mouse event handling methods
		//

		onClickPanel: function() {
			var name = this.model.get('name');

			// find search filter from name
			//
			if (name == 'xdd-covid-19') {
				name = 'covid-19';
			}

			// go to search view
			//
			if (name == 'xDD') {
				window.location = '/search.html';
			} else {
				window.location = '/search.html?dataset=' + name;
			}
		},

		onClickDetailsExpander: function() {
			this.$el.find('.details.collapsible').toggle();
		},

		onClickLinksExpander: function() {
			this.$el.find('.links.collapsible').toggle();
		}
	});
});
