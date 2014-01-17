define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/search/solution-example-view.html',
         'model/collection.cache',
         'model/collection.search',
         'model/collection.example.search',
         'responsive/search/EditSolutionView',
         'responsive/search/AddSolutionView',
         'responsive/view/commandTagView',
         'app/app.grocuser'
         ], 
         function($, Backbone, _,Example, Template,Cache,Search,ExampleSearch,EditView,AddView,TagsView,User) {

	return Backbone.View.extend({
		el: 'div#page-content',
		initialize : function(options) {
			this.exampleId = options.exampleId;
            var m = new Example({id: this.exampleId});
            this.model = m;
            var _this = this;
            m.fetch({success: function() {

            	var editable = _this.model.get("lastUpdatedby") == User.getUserId();
            	_this.model.set("editable",editable);
            	_this.render()}});			
		},
		
		events : {
		   	'click button#back-search-results' : 'homeSearchResults',
		   	'click i#edit' : 'editSolution',
		   	'click button#new' :'addSolution',
		   	'click button#search' : 'doSearch'	
		},
	
        addSolution : function(e) {	
	
            	var _this = this;
				var _view = new AddView({model: _this.model});
                			
				_view.render();        


        },
        
		editSolution : function(e) {
			
			var _this = this;
				var _view = new EditView({model: _this.model});
                			
				_view.render();
				
		

		},

		homeSearchResults : function(e) {
	
		   	e.preventDefault();
		   	Backbone.history.navigate("#searchResults/"+Cache.searchText,{trigger:true});
		
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
			this.model.populateShortSolution(this.model);
			this.model.formatUserDate();
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.empty();
			var json = this.model.toJSON();
			json["search"] = Cache.searchText;
			$el.html(compiled_template(json));
			var refId = this.model.toJSON().reference.id;
			var tagsView = new TagsView({tags:this.model.get("tags"),refId: refId});
			$.Log.mark($el,"SolutionExampleView.js -> search/solution-example-view.html",this.model.toJSON());	
			return this;
		},
	});

});
