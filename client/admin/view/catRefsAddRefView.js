define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'text!admin/template/category-references-add-ref.html' ], 
         function($, Backbone, _,Category, Template) {

	return Backbone.View.extend({
		catId : undefined,
		initialize : function(options) {
			this.catId = options.catId;
		},
		events: {
			'click a#addReference': 'addReferenceModal'
		},
		
		'addReferenceModal' : function(eventName) {
			var _this = this;
			require(['admin/view/addReferenceModalView', 'model/model.reference'], function (ModalView, Reference) {
	    		var _view = new ModalView({model:new Reference()}).render();
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
