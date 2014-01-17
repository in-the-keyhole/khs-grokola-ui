define([ 'jquery', 
         'backbone', 
         'underscore',
         'text!responsive/template/navbar-signed-in.html',
         'app/app.grocuser'], 
         function($, Backbone, _,  Template, GrocUser) {

	return Backbone.View.extend({
		tagName : 'li',
		className : 'dropdown',
		
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template({userId: GrocUser.getUserId()}));
			
			 
			$.Log.mark($el,"navBarSignedInView.js -> navbar-signed-in.html");	
			return this;
		},
	});

});