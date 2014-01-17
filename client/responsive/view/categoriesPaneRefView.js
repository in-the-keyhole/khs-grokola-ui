define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
         'text!responsive/template/category-tab-pane-ref.html'], 
         function($, Backbone, _,Reference, Template) {

	return Backbone.View.extend({
		tagName : 'p',
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"categoriesPaneRefView.js -> category-tab-pane-ref.html",this.model.toJSON());
			return this;
		},
	});

});
