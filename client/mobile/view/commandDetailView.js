define([
	'jquery', 
	'backbone', 
	'underscore', 
	'text!mobile/template/command-detail.html'
	   
	],            
	function($, Backbone, _, template) {    
		        
	
		return Backbone.View.extend({
			id : 'command-details-page',
			initialize : function() {
			  this.model =   window.admin.routers.workspaceRouter.command;
			  
				$("commands").on("click", function(e){				
					back(e);					
					e.preventDefault();//don't let the original href continue with navigation
		        	e.stopPropagation();
					return false;
				});
			  
				
			},
		
			events: {
			      "click #commands" : "commands",
			      "swiperight":  "commands"
			
			    }, 
			
		  commands : function(e){			  
			  		window.admin.routers.workspaceRouter.navigate("#commands",true);
			    	return false;
			},
			    
  
			render : function(eventName) {
			
				var compiled_template = _.template(template);
				var $el = $(this.el);	
				$el.html(compiled_template(this.model.toJSON()) );								
				return this;
			
				
				//$('#comandDetail').listview('refresh');	
				
				return this;
			},
		});

});
