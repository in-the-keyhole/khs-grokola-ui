define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
         'text!responsive/template/reference-tab.html'], 
         function($, Backbone, _,Reference, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		selRefId : undefined,
		
		initialize : function(options) {
			this.selRefId = options.selRefId;
		},
				
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			if ( this.model.id == this.selRefId) {
				$el.addClass("active");
			}
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"referenceTabView.js -> reference-tab.html",this.model.toJSON());	
			return this;
		},
	});

});
