define([ 'jquery', 
         'backbone', 
         'underscore',
		'text!responsive/template/login-modal.html',
		'responsive/view/navBarSignedInView',
		'app/app.grocuser'], 
		function($, Backbone, _,Template, NavBarSignedInView,  GrocUser) {

	return Backbone.View.extend({
		className: 'modal',
		show: function() {
			$(this.el).modal('show');
		},
		
		initialize : function() {
		
		},
		
		onsuccess : null,
		
		events : {
			'click button#close' : 'hide',
			'click button#cancel' : 'hide',
			'click button#login' : 'doLogin',
			'click button#linkedin' : 'doLinkedIn',
			'click button#google' : 'doGoogle',
			'click button#twitter' : 'doTwitter'
		},
		
		doLinkedIn : function(e) {
		
			 var oauthurl = "sherpa/oauth/linkedin";
			
			  $.ajax({
	                url:oauthurl,
	                success:function (data) { 
	                     window.location.href= data.url;
	                },
	                error:function (data) {
	                    console.error("Error sending remote log message to - " + oauthurl);
	                }
	            });
		},
		
		doGoogle : function(e) {
			
			 var oauthurl = "sherpa/oauth/google";
			
			  $.ajax({
	                url:oauthurl,
	                success:function (data) { 
	                     window.location.href= data.url;
	                },
	                error:function (data) {
	                    console.error("Error sending remote log message to - " + oauthurl);
	                }
	            });
		},
		
		doTwitter : function(e) {
			
			 var oauthurl = "sherpa/oauth/twitter";
			
			  $.ajax({
	                url:oauthurl,
	                success:function (data) { 
	                     window.location.href= data.url;
	                },
	                error:function (data) {
	                    console.error("Error sending remote log message to - " + oauthurl);
	                }
	            });
		},
		
		doLogin : function(e) {
			
			var _this = this;
			var _username = $('input#userid').val();
			var _password = $('input#password').val();
			
			
			
			var url = 'sherpa?action=authenticate';
			
			$.post(url, $.param({userid: _username, password: _password}), function(data) {
				
			})
			.success(function(data) { 
				console.log(data);

				GrocUser.setUserId(data.userid);
				GrocUser.setToken(data.token);

				
			
				$('a#login').hide();
				var view = new NavBarSignedInView({
					
				}).render();
				
				$('ul#logged_in').append(view.el);
				
				
				_this.hide();
				
				WorkspaceRouter.navigate("#landing");
				
				
				// invoke callback
				if (_this.onsuccess != null) {
					_this.onsuccess.apply(null,[]);
				}
				
				
			})
			.error(function() { 
				var msg = $("#loginError");
				msg.html("Invalid Userid/Password");
			});
		},
		
		hide : function() {
			$(this.el).modal('hide');
			$(this.el).remove();
		},
		
		render : function() {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			$.Log.mark($el,"loginModalView.js -> login-modal.html");	
			return this;
		},
	});

});
