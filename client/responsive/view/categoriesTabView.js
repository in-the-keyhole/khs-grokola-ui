define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'text!responsive/template/category-tab.html'], 
         function($, Backbone, _,Category, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		selCatId : undefined,
		
		initialize : function(options) {
			this.selCatId = options.selCatId;
		},
				
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			if ( this.model.id == this.selCatId) {
				$el.addClass("active");
			}
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"categoriesTabView.js -> /n category-tab.html",this.model.toJSON());
			return this;
		},
	});

});
