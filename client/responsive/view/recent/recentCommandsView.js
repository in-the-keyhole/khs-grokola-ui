define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.command',
         'text!responsive/template/thumbnail/command-thumb-list.html',
         'responsive/view/thumbview/commandThumbView'], 
         function($, Backbone, _,CommandCollection, Template, CommandThumbView) {

	return Backbone.View.extend({
		el : 'div#recent-commands',
		initialize : function() {
			this.collection = new CommandCollection();
			this.collection.url = 'sherpa/service/commands/view/recent';
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
		},

		
		add : function(model) {
			var view = new CommandThumbView({model : model}).render();
			this.$('ul#command_thumbnails').append(view.el);
		},
		
		reset : function(col) {
			this.$('ul#com_thumbnails').empty();
			col.each(this.add, this);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			$.Log.mark($el,"recentCommandsView.js -> command-thumb-list.html");	
			return this;
		},
	});

});
