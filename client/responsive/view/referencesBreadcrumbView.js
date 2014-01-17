define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'text!responsive/template/references-breadcrumb.html'], 
         function($, Backbone, _,Reference, Template) {

	return Backbone.View.extend({
		tagName : 'ul',
		className : 'breadcrumb',
		
		events : {
			'click a#returnHome' : 'returnHome'
		},
		
		returnHome : function(e) {
			window.admin.routers.workspaceRouter.navigate(
					"#home", {
						trigger : true
					});
		},
				
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"referenceBreadcrumpView.js -> references-breadcrumb.html",this.model.toJSON());	
			return this;
		},
	});

});
