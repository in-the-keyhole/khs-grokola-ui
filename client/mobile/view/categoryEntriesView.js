define([
	'jquery', 
	'backbone', 
	'underscore', 
	'mobile/view/categoryEntriesItemView'
	], 
	function($, Backbone, _, ItemView) {
		
	
		return Backbone.View.extend({
			tagName : "ul",
			id : 'reference-items-page',
			initialize : function() {
			  //  this.collection = new CategoryCollection();
			this.collection.bind("reset", this.render, this);
						
			},
			events: {
				
			      'swiperight #referenceContainer':  'swipecategories'
			
			    }, 
			swipecategories : function(e){		
				window.admin.routers.workspaceRouter.navigate('#categories',true);
				return false;
			},
		render : function(eventName) {
			
				$(this.el).empty();
				_.each(this.collection.models, function(aModel) {
					$(this.el).append(new ItemView({
						model : aModel,
					}).render().el);
				}, this);
				
				
				$('#referenceList').listview('refresh');	
				
				return this;
			},
			
		
		});

});
