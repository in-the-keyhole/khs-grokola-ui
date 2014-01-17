define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'model/collection.reference',
         'responsive/view/categoriesPaneRefView',
         'text!responsive/template/category-tab-pane.html'], 
         function($, Backbone, _,Category, ReferenceCollection, CategoryPaneRefView, Template) {

	return Backbone.View.extend({
		tagName: 'div',
		className: 'tab-pane',
		selCatId : undefined,
		
		initialize : function(options) {
			this.selCatId = options.selCatId;
			this.collection = new ReferenceCollection({catId:this.model.id});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
		},
			
		add : function(model) {
			var view = new CategoryPaneRefView({model : model}).render();
			this.$('div#tab-pane-refs').append(view.el);
		},
		
		reset : function(col) {
			this.$('div#tab-pane-refs').empty();
			this.$('div#tab-pane-refs').append('<p><strong>' + this.model.get("name") + ' References</strong></p>');	
			col.each(this.add, this);
		},
		
		render: function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			if ( this.model.id == this.selCatId) {
				$el.addClass('active');
			}
			$el.attr('id', 'tab' + this.model.id);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"categoriesTabView.js -> category-tab.html",this.model.toJSON());
			return this;
		},
	});

});
