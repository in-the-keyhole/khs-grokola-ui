define(['jquery', 'backbone'], function($, Backbone) {
	// Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
	"use strict";

	var WorkspaceRouter = Backbone.Router.extend({
		id : 'workspaceRouter',
		routes : {
			"login" : "login",
			"catHome" : "catHome",
			"category/view/:id" : "catRefs",
			"reference/view/:catId/:refId" : "refHome",
			"command/view/:refId" : "refCommands",
		},

		initialize : function() {
			$('.back').on('click', function(event) {
				window.history.back();
				return false;
			});
			this.firstPage = true;
			
			
		},
		defaultRoute: function() {
			console.log('default route');	
	    },	
		
	    
	    login: function() {
			require(['admin/view/loginView'], function (ThisView) {		
				var page = new ThisView();
				page.render();											
		     });		
	    },
	    
	    catHome: function() {
	    	require(['admin/view/catHomeView'], function (ThisView) {		
				var page = new ThisView();
				page.render();
		     });		
	    },
	    
	    catRefs : function(id) {
	    	require(['admin/view/catRefsView'], function (ThisView) {
	    		var view = new ThisView({catId: id});
				view.render();
	    	});
	    },
	    
	    refHome : function(catId,refId) {
	    	require(['admin/view/refHomeView'], function (ThisView) {
	    		var view = new ThisView({catId: catId});
				view.render();
	    	});
	    	// command content view
	    	require(['admin/view/refCommandView'], function (ThisView) {
	    		var view = new ThisView({refId: refId});
				view.render();
	    	});
	    },
	    
	    refCommands : function(refId) {
	    	require(['admin/view/refCommandView'], function (ThisView) {
	    		var view = new ThisView({refId: refId});
				view.render();
	    	});
	    },
	});
	return new WorkspaceRouter();
});
