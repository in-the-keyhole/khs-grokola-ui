define([
	'jquery', 
	'backbone', 
	'underscore', 
	'mobile/view/loginView',
	'text!mobile/template/login.html'], 
	function($, Backbone, _, LoginView, LoginTemplate) {
		
		var list = {};
		return Backbone.View.extend({
			id : 'login-page',
			initialize : function() {
				//this.list = new StockListCollection();
				
				$("login").on("click", function(e){				
					navigate(e);					
					e.preventDefault();//don't let the original href continue with navigation
		        	e.stopPropagation();
					return false;
				});
				
				
						
				
			},
		
		    events: {
			      "click #login" : "doLogin"		      
			    },
			
				doLogin : function(e){			  				
					var userid = $("#userid").val();
					var password = $("#password").val();
					var url = 'sherpa?action=authenticate&userid='+userid+'&password='+password;
					$.getJSON(url,
					        function(data) {
							  	if (data.code == "ERROR") {
							  	  	var msg = $("#message");
							  	  	msg.html("Invalid Userid/Password");
							  	   window.admin.routers.workspaceRouter.navigate("#categories",true);
							  	  	
								} else {
						   
								     window.admin.routers.workspaceRouter.navigate("#categories",true);
					              
								}	
						  });		
					
				    return false;
				},
				        
				
			    			    
			render : function(eventName) {
				var compiled_template = _.template(LoginTemplate);
				var $el = $(this.el);
				$el.html(compiled_template());	
				return this;
			},
		});

});
