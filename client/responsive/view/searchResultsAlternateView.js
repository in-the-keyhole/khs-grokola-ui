define([ 'jquery', 
         'backbone', 
         'underscore',
         'model/model.category',
         'model/collection.reference',
         'text!responsive/template/search-results-alt-view.html',
         'responsive/view/referencesBreadcrumbView'], 
         function($, Backbone, _,Category,ReferenceCollection, Template, BreadcrumbView) {

	return Backbone.View.extend({
		el : 'div#page-content',
		selRefId : undefined,
		initialize : function(options) {
			this.collection = new ReferenceCollection({catId:options.catId});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			this.selRefId = options.refId;
		},

		
		add : function(model) {
			var tabView = new ReferenceTabView({model : model, selRefId: this.selRefId}).render();
			this.$('ul#nav-tabs').append(tabView.el);
			var paneView = new ReferencePaneView({model : model, selRefId: this.selRefId}).render();
			this.$('div#tab-content').append(paneView.el);
		},
		
		reset : function(col) {
			this.$('div#breadcrumb').empty();
			var view = new BreadcrumbView({model: this.collection.first()}).render();
			this.$('div#breadcrumb').append(view.el);
			col.each(this.add, this);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.empty();
			$el.html(compiled_template());
			$.Log.mark($el,"searchResultsAlternateView.js -> search-results-alt-view.html");	
			return this;
		},
	});

});
