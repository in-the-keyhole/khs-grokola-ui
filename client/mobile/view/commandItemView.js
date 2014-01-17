define([
		'jquery',
		'backbone',
		'underscore', 
		'text!mobile/template/command-item.html'], 
	function($, Backbone, _, template){
		
		return Backbone.View.extend({
			tagName : "li",
			initialize : function() {
				this.model.bind("change", this.render, this);
				this.model.bind("destroy", this.close, this);
				var $this = this;
				$("#command").on("click", function(e){
					this.navigate(e);					
					e.preventDefault();//don't let the original href continue with navigation
		        	e.stopPropagation();
					return false;
				});
				
					
			},
			render : function(eventName) {
				var compiled_template = _.template(template)
				var $el = $(this.el);				
				$el.html(compiled_template(this.model.toJSON()));
				return this;
			},
			events: {
		      "click #command" : "navigate"
		    },

		    navigate : function(e){
		        window.admin.routers.workspaceRouter.command = this.model;
		    	window.admin.routers.workspaceRouter.navigate("#command",true);
		    	return false;
		    }
		});
		
});	
