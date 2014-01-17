define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
         'text!admin/template/reference-home-add-nav.html' ], 
         function($, Backbone, _,ReferenceModel, Template) {

	return Backbone.View.extend({
		
		catId: undefined,
		initialize : function(options) {
			this.catId = options.catId;
		},
		
		events: {
			'click #addNewReference': 'addReferenceModal'
		},
		
		'addReferenceModal' : function(eventName) {
			var _this = this;
			require(['admin/view/addReferenceModalView', 'model/model.reference'], function (ModalView, Reference) {
	    		var _view = new ModalView({model: new Reference()}).render();
	    		_view.parent = _this;
				_view.show();
	    	});
		},
		
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			return this;
		},
	});

});
