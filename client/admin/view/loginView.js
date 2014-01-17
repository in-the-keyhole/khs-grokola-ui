define([ 'jquery', 
         'backbone', 
         'underscore', 
         'admin/view/loginView',
		'text!admin/template/admin-login.html',
		'app/app.grocuser'], 
		function($, Backbone, _,LoginView, LoginTemplate, GrocUser) {

	return Backbone.View.extend({
		el : 'div#page-details',
		initialize : function() {

			$("login").on("click", function(e) {
				navigate(e);
				e.preventDefault();// don't let the original href continue with
									// navigation
				e.stopPropagation();
				return false;
			});

		},

		events : {
			"click #login" : "doLogin"
		},

		doLogin : function(e) {
			
			var _username = $('input#userid').val();
			var _password = $('input#password').val();
			
			
			
			var url = 'sherpa?action=authenticate';
			
			$.post(url, $.param({userid: _username, password: _password}), function(data) {
				
			})
			.success(function(data) { 
				console.log(data);
				GrocUser.setUserId(data.userid);
			    GrocUser.setToken(data.token);
				window.admin.routers.workspaceRouter.navigate("#catHome",true);
				
			})
			.error(function() { 
				var msg = $("#message");
				msg.html("Invalid Userid/Password");
				window.admin.routers.workspaceRouter.navigate("#login",true);
				 });
			
			//return false;
		},

		render : function(eventName) {
			var compiled_template = _.template(LoginTemplate);
			var $el = $(this.el);
			$el.html(compiled_template());
			return this;
		},
	});

});
