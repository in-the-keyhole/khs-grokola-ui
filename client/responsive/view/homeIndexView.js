define([ 'jquery', 'backbone', 'underscore', 'model/collection.search',
		'text!responsive/template/home-index.html'], function($, Backbone, _,
		Search, Template, RecentCommands) {

	return Backbone.View.extend({
		el : 'div#home-index',
		initialize : function() {

		},

		render : function(eventName) {
			var $el = $(this.el);
			$el.empty();
			var compiled_template = _.template(Template);
			$el.html(compiled_template());
			$.Log.mark($el, "homeIndexView.js -> home-index.html");
			
			
			return this;
		},
	});

});
