define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'text!responsive/template/navbar-category-reference.html'], 
         function($, Backbone, _,Reference, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"navBarCatRefView.js -> navbar-cateory-reference.html",this.model.toJSON());	
			return this;
		},
	});

});
