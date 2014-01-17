define([ 'jquery', 
         'backbone', 
         'underscore',
         'text!responsive/template/navbar-more.html'], 
         function($, Backbone, _, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		className : 'dropdown',
		
	    events: function(e) {

			



		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			
			$('#myTab a:first').tab('show');
			$.Log.mark($el,"navBarMoreView.js -> navbar-more.html");	
			return this;
		},
	});

});
