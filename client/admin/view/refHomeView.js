define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.reference',
          'text!admin/template/reference-home.html',
         'admin/view/refHomeNavView',
         'admin/view/refHomeAddNavView',
         'markitup',
         'markitup_set'], 
         function($, Backbone, _,ReferenceCollection, Template, NavView, AddNavView) {

	return Backbone.View.extend({
		el : 'div#page-details',
		catId: undefined,
		initialize : function(options) {
			this.collection = new ReferenceCollection({catId:options.catId});
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			this.collection.fetch();
			this.catId =  options.catId;
		},
		
		'markItUpElem': function(){
			console.log('inside markitupelem');
			this.$('div#side-nav').append($('#markItUp').markItUp(mySettings));
		},
		
		add : function(model) {
			var view = new NavView({model : model}).render();
			this.$('div#side-nav').append(view.el);
		},
		
		reset : function(col) {
			this.$('div#side-nav').empty();
			col.each(this.add, this);
			this.$('div#side-add-nav').empty();
			var view = new AddNavView({catId: this.catId}).render();
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
