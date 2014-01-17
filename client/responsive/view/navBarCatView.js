define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'model/collection.reference',
         'text!responsive/template/navbar-category.html',
         'responsive/view/navBarCatRefView'], 
         function($, Backbone, _,Category, ReferenceCollection, Template, NavCatRefView) {

	return Backbone.View.extend({
		tagName : 'li',
		className : 'dropdown',
		
		initialize : function() {
			this.collection = new ReferenceCollection({catId:this.model.id});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
		},
		
		add : function(model) {
			var view = new NavCatRefView({model : model}).render();
			this.$('ul#navbar-references').append(view.el);
		},
		
		reset : function(col) {
			this.$('ul#navbar-references').empty();
			col.each(this.add, this);
		},
		
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"navBarCatView.js -> navbar-category.html",this.model.toJSON());	
			return this;
		},
	});

});
