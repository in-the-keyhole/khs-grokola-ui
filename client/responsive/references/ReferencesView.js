define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.reference.overview',
         'text!responsive/references/references-view.html',
         'model/collection.cache',
         'model/collection.search',
         'model/collection.example.search',
         'responsive/references/ReferenceView',
         'responsive/view/commandTagView',
         'app/app.grocuser'
         ], 
         function($, Backbone, _,Collection, Template,Cache,Search,ExampleSearch,ReferenceView,TagsView,User) {

	return Backbone.View.extend({
		el: 'div#page-content',
		initialize : function(options) {
		
			this.collection = new Collection();	
			this.collection.bind("reset", this.add, this);
			this.collection.fetch();
			
		},
		
		events : {
	
		   	'click button#search' : 'doSearch'	
		},
		
	
        add : function(col) {	
				 col.each(this.addView, this);
        },		 
		addView : function(model) {	 

            	var _this = this;
				var _view = new ReferenceView({model: model});
                			
				_view.render();
				
				this.$('div#references').append(_view.el);


        },
        
		editSolution : function(e) {
			
			var _this = this;
				var _view = new EditView({model: _this.model});
                			
				_view.render();
				
		

		},

		homeSearchResults : function(e) {
	
		   	e.preventDefault();
		   	Backbone.history.navigate("#searchResults/"+Cache.searchText,{trigger:true});
		
			/*var _this = this;
			
			this.search = new Search();
			this.search.performSearch(Cache.commands.indexSearchText);
			this.exampleSearch = new ExampleSearch();
			this.exampleSearch.performSearch(Cache.solutions.indexSearchText);			

			//Cache.commands.reset();
			//Cache.solutions.reset();
			$("#page-content").unbind();
			require([ 'responsive/view/homeSearchResultsView'
					 ], function(ResultsView)
			{
				var _view = new ResultsView({
					collection : _this.search,
					solutionCollection : _this.exampleSearch,
					active: 'solution'
				}).render();
				
			});  */
	
		},
		
		doSearch : function(e) {
	
		   	e.preventDefault();
			var text = this.$("input#indexSearchText").val();
			if (text == null || text == '') {
				text = this.$("input#indexSearchText").attr("placeholder");
			}
			
			this.search = new Search();
			this.search.performSearch(text);
			this.exampleSearch = new ExampleSearch();
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
					solutionCollection : _this.exampleSearch,
					active: 'solution'
				}).render();
				
			});
				
		},

			
		render : function(eventName) {
		
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			var json = {search:Cache.searchText};
			$el.html(compiled_template(json));
			
			$.Log.mark($el,"/references/ReferencesView.js -> references/references-view.html");	
			return this;
		},
	});

});
