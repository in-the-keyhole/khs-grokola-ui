define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
         'text!admin/template/reference-commands-add-comm.html' ], 
         function($, Backbone, _,Command, Template) {

	return Backbone.View.extend({
		refId : undefined,
		initialize : function(options) {
			this.refId = options.refId;
		},
		events: {
			'click a#addCommand': 'addCommandModal'
		},
		
		'addCommandModal' : function(eventName) {
			var _this = this;
			require(['admin/view/addCommandModalView', 'model/model.command'], function (ModalView, Command) {
	    		var _view = new ModalView({model:new Command()}).render();
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
