define(['jquery', 'backbone', 'jquerymobile' ], function($, Backbone) {
	// Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
	"use strict";

	var transition = $.mobile.defaultPageTransition;

	var WorkspaceRouter = Backbone.Router.extend({
		// bookmarkMode : false,
		id : 'workspaceRouter',
		routes : {
			"index" : "login",
			"categories" : "categories",
			"categoriesReferenceList" : "categoriesReferenceList",
			"commands" : "commands", 
			"command"  : "command"
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
		
	    categories: function() {
			
			require(['mobile/view/categoryPage'], function (ThisView) {		
				var page = new ThisView();	
				$(page.el).attr({
					'data-role' : 'page',
					'data-add-back-btn' : "false"
				});
				

				page.render();
				
				$(page.el).prependTo($('body'));
				
				$.mobile.changePage($(page.el), {
					transition : 'slide'
				});										
		     });		
	    },
	    
	    categoriesReferenceList: function() {
			
			require(['mobile/view/categoryEntriesPage'], function (ThisView) {		
				var page = new ThisView();	
				$(page.el).attr({
					'data-role' : 'page',
					'data-add-back-btn' : "false" 
				});
				
				page.render();
				
				$(page.el).prependTo($('body'));
				
				$.mobile.changePage($(page.el), {
					transition : 'slide'
				});										
		     });		
	    },
	    
    commands: function() {
			
			require(['mobile/view/commandsPage'], function (ThisView) {		
				var page = new ThisView();	
				$(page.el).attr({
					'data-role' : 'page',
					'data-add-back-btn' : "false"
				});
				
				page.render();
				
				$(page.el).prependTo($('body'));
				
				$.mobile.changePage($(page.el), {
					transition : 'slide'
				});										
		     });		
	    },
	    
	    
	    
	    login: function() {
			
			require(['mobile/view/loginView'], function (ThisView) {		
				var page = new ThisView();	
				$(page.el).attr({
					'data-role' : 'page',
					'data-add-back-btn' : "false"
				});
				
				page.render();
				
				$(page.el).prependTo($('body'));
				
				$.mobile.changePage($(page.el), {
					transition : 'slide'
				});										
		     });		
	    },
	    
	    command: function() {
	    	require(['mobile/view/commandDetailView'], function (ThisView) {		
				var page = new ThisView();	
				$(page.el).attr({
					'data-role' : 'page',
					'data-add-back-btn' : "false"
				});
				
				page.render();
				
				$(page.el).prependTo($('body'));
				
				$.mobile.changePage($(page.el), {
					transition : 'slide'
				});										
		     });		
	    }, 
	    
			
	});
	return new WorkspaceRouter();
});
