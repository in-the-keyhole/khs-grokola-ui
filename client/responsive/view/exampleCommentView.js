define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.comment',
         'text!responsive/template/example-comment.html'], 
         function($, Backbone, _,Example, Template) {

	return Backbone.View.extend({
		
		render: function(eventName) {
			this.model.formatUserDate();
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"exampleCommentView.js -> example-comment.html",this.model.toJSON());
			return this;
		},
	});

});
