define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'model/model.reference',
         'text!responsive/template/solution-example-view.html',
         'responsive/view/referenceExamplesItemView',
         'responsive/view/referenceExamplesBreadcrumbView'], 
         function($, Backbone, _,ExampleModel, ReferenceModel, Template, ExampleView, BreadcrumbView) {

	return Backbone.View.extend({
		el : 'div#page-content',
		initialize : function(options) {
			this.id = options.solutionId;
			this.refId = options.refId;
			var _this = this;
			this.model = new ExampleModel({id: _this.id});
			this.model.fetch({success:function(m,rep,options) {
					
			     var compiled_template = _.template(Template);
			     var $el = $(_this.el);
			     $el.empty();
		   	     m.formatUserDate();
			     $el.html(compiled_template(m.toJSON()));
			     _this.reset(m);
				 
					  }});
			
		},

		events : {	
			'click button#go-back' : 'back'   
		},		

		back : function(eventName) {
	
	        window.history.back();

		},


		
		add : function(model) {
			var tabView = new ExampleView({model : model}).render();
			this.$('div#examples-content').append(tabView.el);
		},
		
		reset : function(model) {
			//$('div#examples-content').empty();
			$('div#breadcrumb').empty();
			// get reference for refid
			var m = new ReferenceModel();
			m.id = model.get('reference').id;
			m.urlRoot = 'sherpa/service/reference';
			var _this = this;
			m.fetch({ success: function() {  
			  			  
			    var _view = new BreadcrumbView({model: m});
			    _view.parent = _this;
			    _view.render();
			    var v = $('div#breadcrumb');
			    v.append(_view.el);
			 //   _this.render();
			 }
			});
		},

		render : function(m,rep,options) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.empty();
			m.formatUserDate();
			$el.html(compiled_template(m.toJSON()));
			//this.reset(m);
			$.Log.mark($el,"referenceSolutionView.js -> example-view.html",this.model.toJSON());	
			
			return this;
		},
	});

});
