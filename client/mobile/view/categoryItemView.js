define([
		'jquery',
		'backbone',
		'underscore', 
		'text!mobile/template/category-item.html'], 
	function($, Backbone, _, template){
		
		return Backbone.View.extend({
			tagName : "li",
			initialize : function() {
				this.model.bind("change", this.render, this);
				this.model.bind("destroy", this.close, this);
				var $this = this;
				$("#category").on("click", function(e){
					navigate(e);					
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
		      "click #category" : "navigate",
		     'swiperight':  'swipecategories'
		 },
			swipecategories : function(e){		
				window.admin.routers.workspaceRouter.ref = this.model;
				window.admin.routers.workspaceRouter.navigate('#categories',true);
				return false;
			},

		    navigate : function(e){
		        window.admin.routers.workspaceRouter.category = this.model;
		    	window.admin.routers.workspaceRouter.navigate("#categoriesReferenceList",true);
		    	return false;
		    }
		});
		
});	
