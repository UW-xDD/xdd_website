/******************************************************************************\
|                                                                              |
|                             journals-form-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for displaying an journals search form.           |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2012-2020 Morgridge Institute for Research (MIR)        |
\******************************************************************************/

define([
	'jquery',
	'underscore',
	'text!templates/search/forms/journals-form.tpl',
	'views/forms/form-view'
], function($, _, Template, FormView) {

	return FormView.extend({

		//
		// attributes
		//

		template: _.template(Template),

		//
		// getting methods
		//

		getValue: function(key) {
			switch (key) {
				case 'journal':
					return this.$el.find('.journal-name input').val();
				case 'publisher':
					return this.$el.find('.publisher-name input').val();
			}
		},

		getValues: function() {
			return {
				journal: this.getValue('journal'),
				publisher: this.getValue('publisher')
			};
		}
	});
});
