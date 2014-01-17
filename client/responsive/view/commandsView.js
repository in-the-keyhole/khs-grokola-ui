define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.command',
         'model/collection.example',
         'text!responsive/template/command-content.html',
         'responsive/view/commandsTabView',
         'responsive/view/commandsPaneView',
         'responsive/view/commandsBreadcrumbView'], 
         function($, Backbone, _,CommandCollection,ExampleCollection, Template, CommandTabView, CommandPaneView, BreadcrumbView) {

	return Backbone.View.extend({
		el : 'div#page-content',
		selCommId : undefined,
		initialize : function(options) {
			this.refId = options.refId;
			this.collection = new CommandCollection({refId:options.refId});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			this.selCommId = options.commId;
		},

		
		add : function(model) {
			var tabView = new CommandTabView({model : model, selCommId: this.selCommId}).render();
			this.$('ul#nav-tabs').append(tabView.el);
			var paneView = new CommandPaneView({model : model, selCommId: this.selCommId}).render();
			this.$('div#tab-content').append(paneView.el);
		},
		
		reset : function(col) {
			this.$('ul#nav-tabs').empty();
			this.$('div#tab-content').empty();
			this.$('div#breadcrumb').empty();
			var _view = new BreadcrumbView({model: this.collection.first()});
			_view.parent = this;
			_view.render();
			this.$('div#breadcrumb').append(_view.el);
			col.each(this.add, this);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.empty();
			$el.html(compiled_template());
			
			$.Log.mark($el,"commandsView.js -> command-content.html",this.collection.toJSON());	
			return this;
		},
	});

});
