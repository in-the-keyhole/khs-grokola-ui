define([
	'jquery', 
	'backbone', 
	'underscore', 
	'mobile/view/commandItemView'
	], 
	function($, Backbone, _, ItemView) {
		
	
		return Backbone.View.extend({
			tagName : "ul",
			id : 'command-items-page',
			initialize : function() {
			  //  this.collection = new CategoryCollection();
			this.collection.bind("reset", this.render, this);
			
			
						
			},
			events: {
			      'swiperight':  'swipecategoriesReferenceList'
			
			    }, 
			  
			swipecategoriesReferenceList : function(e){			  
			  		window.admin.routers.workspaceRouter.navigate('#categoriesReferenceList',true);
			    	return false;
			},
   
			render : function(eventName) {
			
				$(this.el).empty();
				_.each(this.collection.models, function(aModel) {
					$(this.el).append(new ItemView({
						model : aModel,
					}).render().el);
				}, this);
				
				
				$('#commandList').listview('refresh');	
				
				return this;
			},
			
		});

});
