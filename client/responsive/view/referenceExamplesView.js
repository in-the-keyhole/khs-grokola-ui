define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.example',
         'model/model.reference',
         'text!responsive/template/examples-list.html',
         'responsive/view/referenceExamplesItemView',
         'responsive/view/referenceExamplesBreadcrumbView'], 
         function($, Backbone, _,ExampleCollection, ReferenceModel, Template, ExampleView, BreadcrumbView) {

	return Backbone.View.extend({
		el : 'div#page-content',
		initialize : function(options) {
			this.refId = options.refId;
			this.collection = new ExampleCollection({refId:options.refId});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
		},

		events : {	
			'click i#go-back' : 'back'   
		},		

		back : function(eventName) {
	
	        window.history.back();

		},


		
		add : function(model) {
			var tabView = new ExampleView({model : model}).render();
			this.$('div#examples-content').append(tabView.el);
		},
		
		reset : function(col) {
			this.$('div#examples-content').empty();
			this.$('div#breadcrumb').empty();
			// get reference for refid
			var m = new ReferenceModel();
			m.id = this.refId;
			m.urlRoot = 'sherpa/service/reference';
			var _this = this;
			m.fetch({ success: function() {  
			  			  
			    var _view = new BreadcrumbView({model: m});
			    _view.parent = _this;
			    _view.render();
			    _this.$('div#breadcrumb').append(_view.el);
			    col.each(_this.add, _this); }
			});
		},

		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.empty();
			$el.html(compiled_template(this.collection.first().toJSON()));
			$.Log.mark($el,"examplesView.js -> examples-list.html",this.collection.toJSON());	
			return this;
		},
	});

});
