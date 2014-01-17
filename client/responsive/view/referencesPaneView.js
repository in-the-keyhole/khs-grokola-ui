define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
         'model/collection.command',
         'responsive/view/referencesPaneCommView',
         'text!responsive/template/reference-tab-pane.html'], 
         function($, Backbone, _,Reference, CommandCollection, ReferencePaneCommView, Template) {

	return Backbone.View.extend({
		tagName: 'div',
		className: 'tab-pane',
		selRefId : undefined,
		view: null,
		
		initialize : function(options) {
			this.selRefId = options.selRefId;
			this.collection = new CommandCollection({refId:this.model.id});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
		},
			
		add : function(model) {
			view = new ReferencePaneCommView({model : model, refId : this.selRefId}).render();
			this.$('table#tab-pane-refs').append(view.el);
		},
		
		reset : function(col) {
			this.$('table#tab-pane-refs').empty();
			this.$('table#tab-pane-refs').append('<thead><tr><th colspan="2" align="left"></th></tr></thead>');	
			col.each(this.add, this);
		},
		
		render: function(eventName) {
			
			  var compiled_template = _.template(Template);
			  var $el = $(this.el);
			  if ( this.model.id == this.selRefId) {
				$el.addClass('active');
			  }
			  $el.attr('id', 'tab' + this.model.id);
			  $el.html(compiled_template(this.model.toJSON()));
		
			$.Log.mark($el,"referencesPaneView.js -> reference-tab-pane.html");
			
			
			return this;
		},
	});

});
