define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference.overview',
         'text!responsive/references/reference-view.html',
         'app/app.grocuser'
         ], 
         function($, Backbone, _,Model, Template,User) {

	return Backbone.View.extend({
		tagName : 'div',
		initialize : function(options) {
		
		
			
		},
		
		events : {
		   	
		},
	
   
			
		render : function(eventName) {
		
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			var json = this.model.toJSON();
			$el.html(compiled_template(json));
			
			$.Log.mark($el,"/references/ReferenceView.js -> references/reference-view.html");	
			return this;
		},
	});

});
