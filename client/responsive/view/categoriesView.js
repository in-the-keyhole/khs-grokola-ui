define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.category',
         'text!responsive/template/categories-content.html',
         'responsive/view/categoriesTabView',
         'responsive/view/categoriesPaneView'], 
         function($, Backbone, _,CategoryCollection, Template, CategoryTabView, CategoryPaneView) {

	return Backbone.View.extend({
		el : 'div#page-content',
		selCatId : undefined,
		initialize : function(options) {
			this.collection = new CategoryCollection();
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			this.selCatId = options.catId;
		},

		events : {
			'click a#returnHome' : 'returnHome'
		},
		
		returnHome : function(e) {
			window.admin.routers.workspaceRouter.navigate(
					"#home", {
						trigger : true
					});
		},
		
		add : function(model) {
			var tabView = new CategoryTabView({model : model, selCatId: this.selCatId}).render();
			this.$('ul#nav-tabs').append(tabView.el);
			var paneView = new CategoryPaneView({model : model, selCatId: this.selCatId}).render();
			this.$('div#tab-content').append(paneView.el);
		},
		
		reset : function(col) {
			this.$('ul#nav-tabs').empty();
			this.$('div#tab-content').empty();
			col.each(this.add, this);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.empty();
			$el.html(compiled_template());
			
			$.Log.mark($el,"categoriesView.js -> categories-content.html",this.collection.toJSON());
			
			return this;
		},
	});

});
