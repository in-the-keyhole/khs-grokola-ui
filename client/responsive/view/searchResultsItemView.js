define([
		'jquery',
		'backbone',
		'underscore', 
		'text!responsive/template/search-results-item.html'], 
	function($, Backbone, _, Template){
		
		return Backbone.View.extend({
			tagName : "li",
			className: "span3", 
			initialize : function() {
				this.model.bind("change", this.render, this);
				this.model.bind("destroy", this.close, this);
				
			},
			render : function(eventName) {
				var compiled_template = _.template(Template);
				var $el = $(this.el);				
				$el.html(compiled_template(this.model.toJSON()));
				$.Log.mark($el,"searchResultsItemView.js -> search-results-item.html");	
				
				return this;
			},
		
			
		});
		
});	