define(['backbone', 'jquery', 'responsive/router/workspaceRouter','jquery.cookie'], function(Backbone, $, WorkspaceRouter) {
	// Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
	"use strict";

	 $(function(){
		window.admin = {
			routers : {
				workspaceRouter : WorkspaceRouter
			},
			views : {},
			models : {},
			category: null,
			ref: null
		};
		
	
		var started = Backbone.history.start({pushState:false, root:'/HTML5BackboneJQMRequireJS/'});
		window.admin.routers.workspaceRouter.navigate("#home", {trigger:true});
	});
});
