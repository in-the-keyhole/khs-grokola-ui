define(['jquery', 'backbone','app/app.grocuser',    'model/collection.search',
'model/collection.example.search'], function($, Backbone, GrocUser,Search,ExampleSearch) {
	// Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
	"use strict";

	var WorkspaceRouter = Backbone.Router.extend({
		
		id : 'workspaceRouter',
		routes : {
			"home" : "home",
			"category/view/:catId" : "viewCategories",
			"reference/view/:catId/:refId" : "viewReferences",
			"command/view/:refId/:commId" : "viewCommand",
			"examples/view/:refId" : "viewReferenceExamples",
			"example/view/:refId/:exampleId" : "viewExample",
			"solution/view/:refId/:solutionId" : "viewSolution",
			"oauth/:userId/:token" : "oauthLogin",
			"search/solution/:refId/:exampleId" : "searchViewSolution",
			"search/command/:refId/:exampleId" : "searchViewCommand",
			"searchResults/:searchText" : "searchResults",
			"references" : "references",
			"search/command/:refId" : "searchViewReference",
			"quick/add" : "quickAdd"
	
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
		
	    oauthLogin: function(userId, token) {
	    
	    	GrocUser.setUserId(userId);
			GrocUser.setToken(token);
	    	window.location.href='#home';
	    },
	    
	
	    home: function() {
	    	require(['responsive/view/homeIndexView'], function (ThisView) {		
				var view = new ThisView();
				view.render();											
		    });
	    	require(['responsive/navbar/navBarView'], function (ThisView) {		
				var view = new ThisView();
				view.render();											
		    });
			require(['responsive/view/recent/recentThumbnailsView'], function (ThisView) {		
				var view = new ThisView();
				view.render();											
		    });
			require(['responsive/view/homeSearchView'], function(SearchView) {
				var view = new SearchView();
				view.render();
			});
			
			
	    },
	    
	    viewCategories : function(catId) {
	    	require(['responsive/view/categoriesView'], function(ThisView) {
	    		var view = new ThisView({catId : catId});
	    		view.render();
	    	});
	    },
	    
	    viewReferences : function(catId, refId) {
	    	require(['responsive/view/referencesView'], function(ThisView) {
	    		var view = new ThisView({catId : catId, refId: refId});
	    		view.render();
	    	});
	    },
	    
	    viewCommand : function(refId, commId) {
	    	require(['responsive/view/commandsView'], function(ThisView) {
	    		var view = new ThisView({refId : refId, commId : commId});
	    		view.render();
	    	});
	    },
	    
	    viewReferenceExamples : function(refId) {
	    	require(['responsive/view/referenceExamplesView'], function(ThisView) {
	    		var view = new ThisView({refId : refId});
	    		view.render();
	    	});
	    },
	    
	    viewExample : function(refId, exampleId) {
	    	require(['responsive/view/exampleView'], function(ThisView) {
	    		var view = new ThisView({refId : refId, exampleId: exampleId});
	    		//view.render();
	    	});
	    },
	    
	    viewSolution : function(refId, solutionId) {
	    	require(['responsive/view/referenceSolutionView'], function(ThisView) {
	    	var view = new ThisView({refId : refId, solutionId: solutionId});
		   // view.render();
	      });
	    },

	    
	    searchViewSolution : function(refId, exampleId) {
	    	$("#page-content").unbind()
	    	require(['responsive/search/SolutionExampleView'], function(ThisView) {
	    		var view = new ThisView({refId : refId, exampleId: exampleId});
	    		//view.render();
	    	});
	    },
	    
	    
	    searchViewCommand : function(refId, commandId) {
	    	require(['responsive/search/command/CommandView'], function(ThisView) {
	    		var view = new ThisView({refId : refId, commId: commandId});
	    		view.render();
	    	});
	    },
	    
	    searchViewReference : function(refId) {
	    	require(['responsive/search/command/CommandView'], function(ThisView) {
	    		var view = new ThisView({refId : refId});
	    		view.render();
	    	});
	    },

	    
	    searchResults: function(searchText) {
	
	    	var search = new Search();
			search.performSearch(searchText);
			var exampleSearch = new ExampleSearch();
			exampleSearch.performSearch(searchText);

	       $("#page-content").unbind()
			require([ 'responsive/view/homeSearchResultsView'
					 ], function(ResultsView)
			{
				var _view = new ResultsView({
					collection : search,
					solutionCollection : exampleSearch,
					active: 'solution'
				}).render();
				
			});

	    },
	    
	    references : function() {
	    	require(['responsive/references/ReferencesView'], function(ThisView) {
	    	   	var view = new ThisView();
	    		view.render();
	    	});
	    },
	    
	    quickAdd: function() {
	    	
	    	require(['responsive/quickAdd/QuickAddView'], function(ThisView) {
	    	   	var view = new ThisView();
	    		view.render();
	    	});
          

	    }

	    
	});
	return new WorkspaceRouter();
});
