define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
         'text!admin/template/reference-command-item.html' ], 
         function($, Backbone, _,CommandModel, Template) {

	return Backbone.View.extend({
		
		events: {
			'click button#editCommandModal': 'editCommandModal',
			'click button#deleteCommandModal': 'deleteCommandModal',
		},		
		
		'editCommandModal' : function(eventName) {
			var _this = this;
			require(['admin/view/editCommandModalView', 'model/model.command'], function (ModalView, Command) {
	    		var _view = new ModalView({model:_this.model}).render();
	    		_view.parent = _this;
				_view.show();
	    	});
		},
		
		'deleteCommandModal' : function(eventName) {
			var _this = this;
			require(['admin/view/deleteCommandModalView', 'model/model.command'], function (ModalView, Command) {
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
