define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.example',
         'model/collection.command',
         'text!responsive/template/thumbnail/thumb-list.html',
         'responsive/view/thumbview/solutionThumbView',
         'responsive/view/thumbview/commandThumbView'], 
         function($, Backbone, _,CommandCollection, SolutionCollection, Template, SolutionThumbView, CommandThumbView) {

	return Backbone.View.extend({
		el : 'div#recent-viewed-thumbviews',
		initialize : function() {
			this.solutionCollection = new SolutionCollection();
			this.solutionCollection.url = 'sherpa/service/examples/view/recent';
			this.solutionCollection.fetch();
			this.solutionCollection.bind("reset", this.resetSolution, this);
			this.solutionCollection.bind("add", this.addSolution, this);
			
			this.commandCollection = new CommandCollection();
			this.commandCollection.url = 'sherpa/service/commands/view/recent';
			this.commandCollection.fetch();
			this.commandCollection.bind("reset", this.resetCommands, this);
			this.commandCollection.bind("add", this.addCommand, this);
		},

		addSolution : function(model) {
			var view = new SolutionThumbView({model : model}).render();
			this.$('ul#thumbnail_list').append(view.el);
		},
		
		addCommand : function(model) {
			var view = new CommandThumbView({model : model}).render();
			this.$('ul#thumbnail_list').append(view.el);
		},
		
		resetSolution : function(col) {
			col.each(this.addSolution, this);
		},
		
		resetCommands : function(col) {
			this.$('ul#thumbnail_list').empty();
			col.each(this.addCommand, this);
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			$.Log.mark($el,"recentThumbnailsView.js -> solution-thumb-list.html");	
			return this;
		},
	});

});
