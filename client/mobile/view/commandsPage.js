define([
	'jquery', 
	'backbone', 
	'underscore', 
	'mobile/model/commandCollection', 
	'mobile/view/commandsView',
	'text!mobile/template/commands.html'], 
	function($, Backbone, _, CommandCollection, CommandView, template) {
		
		var list = {};
		return Backbone.View.extend({ 
			id : 'command-entries-page',
			initialize : function() {		
				var reference = window.admin.routers.workspaceRouter.ref;
				this.list = new CommandCollection(reference.toJSON().commands);	
				this.parentDescription =reference.toJSON().description;
			},
		 

		
			render : function(eventName) {
					
				
				var compiled_template = _.template(template);
				var $el = $(this.el);
				$el.html(compiled_template());
				var parDesc = $(this.el).find('#parentDescription');
				parDesc.text(this.parentDescription);
				this.listView = new CommandView({
					el : $('ul', this.el),
					collection : this.list
				});
				this.listView.render();
				return this;
			},
		});

});
