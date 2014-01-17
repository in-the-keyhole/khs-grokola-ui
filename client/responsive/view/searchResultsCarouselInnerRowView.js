define([
	'jquery', 
	'backbone', 
	'underscore', 
	'responsive/view/searchResultsView',
	'text!responsive/template/search-results-list.html'
	], 
	function($, Backbone, _, ItemView, Template) {
		
	
		return Backbone.View.extend({
			tagName: "div",
			id: "outer",
			initialize : function(divnumber) {
			this.collection.bind("reset", this.render, this);
			this.divnumber = divnumber;
			
			
						
			},
			 
			
		render : function(eventName) {
			
			var compiled_template = _.template(Template);
			var $el = $(this.el);				
			$el.html(compiled_template);
			$.Log.mark($el,"searchResultsCarouselInnerRowView.js -> search-results-list.html");	
			
			this.listView = new ItemView({ 
				collection : this.collection
			});
			var renderedList = this.listView.render();
			this.$('div#innerItemDiv').attr("id", "innerItemDiv"+this.divnumber.divnumber);
			
			
			this.$('div#innerItemDiv'+this.divnumber.divnumber).append(renderedList.el);
			
				
			return this;
			},
			
		
		});

});