define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/template/solution-results-thumb-item.html'], 
         function($, Backbone, _,Example, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		className : 'span2',
		
		initialize : function() {

		},
		
	    events : {
			'click a#go'  : 'go'
		},
		
		go : function(e) {
			e.preventDefault();
			
			Backbone.history.navigate("#search/solution/"+this.model.get("reference").id+"/"+this.model.get("id"), {trigger:true,replace:false});
			
        },

		render : function(eventName) {
			this.model.populateShortDesc(this.model);
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"solutionsResultsView.js -> solutions-results-thumb-item.html",this.model.toJSON());
			return this;
		},
	});

});
