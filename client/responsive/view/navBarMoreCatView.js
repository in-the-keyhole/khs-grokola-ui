define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'text!responsive/template/navbar-more-category.html'], 
         function($, Backbone, _,Category, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"navBarMoreCatView.js -> navbar-more-category.html",this.model.toJSON());	
			return this;
		},
	});

});
