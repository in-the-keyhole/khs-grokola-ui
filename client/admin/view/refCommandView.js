define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.command',
         'text!admin/template/reference-commands.html',
         'admin/view/refCommandItemView',
         'admin/view/refCommandAddCommView'], 
         function($, Backbone, _,CommandCollection, Template, CommandView, AddCommandView) {

	return Backbone.View.extend({
		el : 'div#page-content',
		refId: undefined,
		initialize : function(options) {
			this.collection = new CommandCollection({refId:options.refId});
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			this.collection.fetch();
			this.refId = options.refId;
		},
		
		add : function(model) {
			var view = new CommandView({model : model}).render();
			this.$('div#cmds-accordian').append(view.el);
		},
		
		reset : function(col) {
			this.$('div#cmds-accordian').empty();
			col.each(this.add, this);
			var view = new AddCommandView({refId: this.refId}).render();
			view.parent= this;
			this.$('div#add-command').append(view.el);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			return this;
		},
	});

});
