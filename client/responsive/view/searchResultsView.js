define([
	'jquery', 
	'backbone', 
	'underscore', 
	'responsive/view/searchResultsItemView'
	], 
	function($, Backbone, _, ItemView) {
		
	
		return Backbone.View.extend({
			tagName : "ul",
			className: "thumbnails",
			initialize : function() {
			this.collection.bind("reset", this.render, this);
						
			},
			 
			
		render : function(eventName) {
			_.each(this.collection.models, function(aModel) {
				aModel.populateShortDesc(aModel);
					$(this.el).append(new ItemView({
						model : aModel,
					}).render().el);
				}, this);
				
				
				return this;
			},
			
		
		});

});