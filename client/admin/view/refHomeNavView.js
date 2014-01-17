define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
         'text!admin/template/reference-home-nav.html' ], 
         function($, Backbone, _,ReferenceModel, Template) {

	return Backbone.View.extend({
		initialize : function(options) {
			
		},

		events: {
			'click a#editReferenceButton': 'editReferenceModal',
			'click a#deleteReferenceButton': 'deleteReferenceModal',
		},
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			return this;
		},
		
		'editReferenceModal' : function(eventName) {
			var _this = this;
			require(['admin/view/editReferenceModalView', 'model/model.reference'], function (ModalView, Reference) {
	    		var _view = new ModalView({model:_this.model}).render();
	    		_view.parent = _this;
				_view.show(); 
	    	});
		},
		
		'deleteReferenceModal' : function(eventName) {
			var _this = this;
			require(['admin/view/deleteReferenceModalView', 'model/model.reference'], function (ModalView, Reference) {
	    		var _view = new ModalView({model:_this.model}).render();
	    		_view.parent = _this;
				_view.show();
	    	});
		},
	});

});
