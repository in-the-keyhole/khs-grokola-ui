define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.reference',
         'text!admin/template/category-references.html',
         'admin/view/catRefsAddRefView'], 
         function($, Backbone, _,ReferenceCollection, Template, AddRefView) {

	return Backbone.View.extend({
		el : 'div#page-content',
		catId : undefined,
		initialize : function(options) {
			this.collection = new ReferenceCollection({catId:options.catId});
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			this.collection.fetch();
			this.catId = options.catId;
		},
		
		add : function(model) {
			this.$('ul').append('<li><a href="#reference/view/' + model.get("category").id + '/'+ model.get("id") + '"><i class="icon-chevron-right"></i> <strong>'+ model.get("name") + '</strong></a><li>');
		},
		
		reset : function(col) {
			this.$('ul').empty();
			col.each(this.add, this);
			var view = new AddRefView({catId: this.catId}).render();
			view.parent= this;
			this.$('div#add-reference').append(view.el);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template({}));
			return this;
		},
	});

});
