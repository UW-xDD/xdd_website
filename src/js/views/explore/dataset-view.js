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
			'click .panel': 'onClickPanel'
		},


		//
		// rendering methods
		//

		toHTML: function(string) {
			var terms = string.split(' ');
			for (var i = 0; i < terms.length; i++) {
				var term = terms[i];

				// show urls as links
				//
				if (term.startsWith('http://') || term.startsWith('https://') || term.startsWith('www.')) {
					terms[i] = '<a href="' + term + '" target="_blank">' + term + '</a>';
				}
			}
			return terms.join(' ');
		},

		templateContext: function() {
			return {
				description: this.toHTML(this.model.get('description')),
				index: this.options.index
			}
		},

		onRender: function() {
			var name = this.model.get('name');

			// add styling class
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
				this.$el.find('.details-expander').show();
				this.$el.find('.details-expander').on('click', () => {
					this.$el.find('.details.collapsible').toggle();
				});
			}
		},

		showLinks: function() {
			var links = this.model.get('links');

			// show links
			//
			if (links && links.length > 0) {
				for (var j = 0; j < links.length; j++) {
					var link = links[j];
					$link = $('<li><a href="' + link.url + '" target="_blank">' + link.name + '</a>' + link.description + '</li>');
					this.$el.find('.links ol').append($link);
				}
				this.$el.find('.links-expander').show();
				this.$el.find('.links-expander').on('click', () => {
					this.$el.find('.links.collapsible').toggle();
				});
			}
		},

		//
		// mouse event handling methods
		//

		onClickPanel: function() {
			var name = this.model.get('name');
			if (name == 'xdd-covid-19') {
				name = 'covid-19';
			}
			if (name == 'xDD') {
				window.location = '/search.html';
			} else {
				window.location = '/search.html?dataset=' + name;
			}
		}
	});
});
