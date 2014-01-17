define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
         'text!admin/template/category-home-nav.html' ], 
         function($, Backbone, _,Category, Template) {

	return Backbone.View.extend({
		
		events: {
			'click a#editCategoryModal': 'editCategoryModal',
			'click a#deleteCategoryModal': 'deleteCategoryModal',
		},
		
		'editCategoryModal' : function(eventName) {
			var _this = this;
			require(['admin/view/editCategoryModalView', 'model/model.category'], function (ModalView, Category) {
	    		var _view = new ModalView({model:_this.model}).render();
	    		_view.parent = _this;
				_view.show();
	    	});
		},
		
		'deleteCategoryModal' : function(eventName) {
			var _this = this;
			require(['admin/view/deleteCategoryModalView', 'model/model.category'], function (ModalView, Category) {
	    		var _view = new ModalView({model:_this.model}).render();
	    		_view.parent = _this;
				_view.show();
	    	});
		},
		
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			return this;
		},
	});

});
