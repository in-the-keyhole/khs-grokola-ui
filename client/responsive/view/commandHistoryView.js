define([ 'jquery', 
         'backbone', 
         'underscore', 
        'responsive/view/commandHistoriesView',
        'model/collection.commandhistory',
         'text!responsive/template/command-hist-content.html',
      ], 
         function($, Backbone, _,CommandHistoriesView, CommandHistoryCollection, Template) {


		return Backbone.View.extend({
			el: 'div#hist_content',
	
			render: function(eventName) {
				var compiled_template = _.template(Template);
				var $el = $(this.el);
				$el.html(compiled_template);
				_.each (this.collection.models, function(aModel){
					aModel.format();
					var tabView = new CommandHistoriesView({model: aModel}).render();
					$el.append(tabView.el);
					
				});
				return this;
			},
		});


});
