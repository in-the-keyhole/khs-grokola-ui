define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.category',
         'model/model.index',
         'text!admin/template/category-home.html',
         'admin/view/catHomeNavView',
         'admin/view/catHomeAddNavView'], 
         function($, Backbone, _,CategoryCollection, Index, Template, NavView, AddNavView) {

	return Backbone.View.extend({
		el : 'div#page-details',
		initialize : function() {
			this.collection = new CategoryCollection();
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			
			
		},
		events : {
			'click button#refreshIndexes' : 'refreshIndexes',
		},
		
		refreshIndexes: function() {
			this.index = new Index();
			this.index.save();
		},
		add : function(model) {
			var view = new NavView({model : model}).render();
			this.$('div#side-nav').append(view.el);
		},
		
		reset : function(col) {
			this.$('div#side-nav').empty();
			col.each(this.add, this);
			this.$('div#side-add-nav').empty();
			var view = new AddNavView().render();
			view.parent= this;
			this.$('div#side-add-nav').append(view.el);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			return this;
		},
	});

});
