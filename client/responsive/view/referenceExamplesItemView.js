define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/template/example-list-item.html'], 
         function($, Backbone, _,Example, Template) {

	return Backbone.View.extend({
		
		initialize : function(options) {
			this.selRefId = options.selRefId;
		},
				
		render : function(eventName) {
			this.model.populateShortSolution(this.model);
			this.model.formatUserDate();
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"referenceExamplesItemView.js -> example-list-item.html",this.model.toJSON());	
			return this;
		},
	});

});
