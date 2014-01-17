define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/template/thumbnail/solution-thumb-item.html'], 
         function($, Backbone, _,Command, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		className : 'span2',
		
		initialize : function() {

		},
		
		render : function(eventName) {
			this.model.populateShortDesc(this.model);
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"solutionThumbView.js -> solution-thumb-item.html",this.model.toJSON());
			return this;
		},
	});

});
