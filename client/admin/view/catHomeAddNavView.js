define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'text!admin/template/category-home-add-nav.html' ], 
         function($, Backbone, _,Category, Template) {

	return Backbone.View.extend({
		
		events: {
			'click a#addCategory': 'addCategoryModal'
		},
		
		'addCategoryModal' : function(eventName) {
			var _this = this;
			require(['admin/view/addCategoryModalView', 'model/model.category'], function (ModalView, Category) {
	    		var _view = new ModalView({model: new Category()}).render();
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
