define([
	'jquery', 
	'backbone', 
	'underscore', 
	'mobile/view/categoryItemView',
	], 
	function($, Backbone, _, ItemView) {
		
	
		return Backbone.View.extend({
			tagName : "ul",
			id : 'categories-page',
			
			initialize : function() {
			
				this.collection.bind("reset", this.render, this);
						
			},
		
  
			render : function(eventName) {
			
				$(this.el).empty();
				_.each(this.collection.models, function(aModel) {
					$(this.el).append(new ItemView({
						model : aModel,
					}).render().el);
				}, this);
				$('#categoryList').listview('refresh');	
			
				return this;
			},
		});

});
