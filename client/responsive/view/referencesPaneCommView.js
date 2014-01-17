define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
         'text!responsive/template/reference-tab-pane-comm.html'], 
         function($, Backbone, _,Command, Template) {

	return Backbone.View.extend({
		tagName : 'tr',
		selRefId : undefined,
		
		initialize : function(options) {
			this.selRefId = options.refId;
		},
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			//this.model.set({refId: this.selRefId});
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"referencesPaneCommView.js -> reference-tab-pane-comm.html",this.model.toJSON());	
			return this;
		},
	});

});
