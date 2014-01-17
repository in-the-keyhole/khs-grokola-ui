define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
         'text!responsive/template/command-breadcrumb.html',
     	'app/app.securityutility'], 
         function($, Backbone, _,Reference, Template,Security) {

	return Backbone.View.extend({
		tagName : 'ul',
		className : 'breadcrumb',
		
		events : {
			'click i#add' : 'addCommand',
			'click a#returnHome' : 'returnHome'			
		},
		
		returnHome : function(e) {
			window.admin.routers.workspaceRouter.navigate(
					"#home", {
						trigger : true
					});
		},
					
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"commandsBreadcrumbView.js -> command-breadcrumb.html",this.model.toJSON());
			return this;
		},
		
		addCommand : function() {
			
			if (Security.isAuthenticated()) {

			var _this = this;
			require(['responsive/view/addCommandModalView', 'model/model.command'], function (ModalView, Command) {
	    		var _view = new ModalView({model:_this.model}).render();
	    		_view.parent = _this;
				_view.show();
	    	});
			
			} else {
				
				var callback = function() { 
				
					require(['responsive/view/addCommandModalView'], function (ModalView) {
			    		var _view = new ModalView().render();
			    		_view.parent = this;
						_view.show();
			    	});
					
					
				};
				// not authenticated. login..
				require(['responsive/view/loginModalView'], function (LoginView) {
		    		var _view = new LoginView().render();
		    		_view.onsuccess = callback;
					_view.show();
		    	});
				
				
			}
			
			
		},
		
		
		
		
		
		
	});

});
