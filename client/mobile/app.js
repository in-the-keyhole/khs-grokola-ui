define(['backbone', 'mobile/router/workspaceRouter'], function(Backbone, WorkspaceRouter) {
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
		
		// clear local storage
		localStorage.clear();
		var started = Backbone.history.start({pushState:false, root:'/HTML5BackboneJQMRequireJS/'});
		window.admin.routers.workspaceRouter.navigate("#categories", {trigger:true});
	});
});
