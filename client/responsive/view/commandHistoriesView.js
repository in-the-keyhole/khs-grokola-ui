define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.commandhistory',
         'text!responsive/template/command-hist-item.html',
      ], 
         function($, Backbone, _,Model, Template) {


		return Backbone.View.extend({
			el: 'div#inner_hist',
			
			render: function(eventName) {
				var compiled_template = _.template(Template);
				var $el = $(this.el);				
				$el.append(compiled_template(this.model.toJSON()));
				console.log("JSON data:",this.model.toJSON()); 
				$.Log.mark($el,"commandHistoriesView.js -> command-hist-item.html",this.model.toJSON());
				return this;
			},
		});


});