define([ 'jquery', 
         'backbone', 
         'underscore',
         'model/collection.search',
         'model/collection.example.search',
         'text!responsive/template/home-search.html',
         'model/collection.cache'
         ], 
         function($, Backbone, _,Search,ExampleSearch, Template,Cache) {

	return Backbone.View.extend({
		el : 'div#home-search',
		search : null,
		exampleSearch: null,
		initialize : function() {
		
		   
			this.search = new Search();
			this.exampleSearch = new ExampleSearch();
		  
	
			
		},

		events : {
			//'submit form#indexSearch' : 'callIndexSearch'
		   	'submit form#indexSearch' : 'homeSearchResults',
		   	'click button#quick-add' : 'quickAdd'
		},
		
		homeSearchResults : function(e) {
	
		   	e.preventDefault();
			var text = this.$("input#indexSearchText").val();
			if (text == null || text == '') {
				text = this.$("input#indexSearchText").attr("placeholder");
			}
				
			this.search.performSearch(text);
			this.exampleSearch.performSearch(text);
			Cache.solutions = this.exampleSearch;
			Cache.commands = this.search;
			Cache.searchText = text;
			

			var _this = this;
			require([ 'responsive/view/homeSearchResultsView',
					 ], function(ResultsView)
			{
				var _view = new ResultsView({
					collection : _this.search,
					solutionCollection : _this.exampleSearch
				}).render();
				
			});
				

		},

		
		callIndexSearch : function(e) {
			e.preventDefault();
			var text = this.$("input#indexSearchText").val();
			if (text == null || text == '') {
				text = this.$("input#indexSearchText").attr("placeholder");
			}
			this.search.performSearch(text);
			this.search.fetch();
			
			 
			var _this = this;
			require([ 'responsive/view/addSearchResultModalView',
					'model/collection.search' ], function(ModalView,
					Search) {
				var _view = new ModalView({
					collection : _this.search
				}).render();
				_view.parent = _this;
				_view.show();
			});

		},
		
		quickAdd: function(e) {
	
			e.preventDefault();
			Backbone.history.navigate("#quick/add",{trigger:true});
			

		},

		render : function(eventName) {
		
			var $el = $(this.el);
			$el.empty();			
			var compiled_template = _.template(Template);
			$el.html(compiled_template());
			$.Log.mark($el,"homeSearchView.js -> home-search.html");	
			return this;
		},
	});

});
