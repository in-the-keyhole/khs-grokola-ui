define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/collection.command',
         'model/collection.example',
         'model/model.reference',
         'model/collection.cache', 
         'model/collection.search',
         'model/collection.example.search',
         'text!responsive/search/command/command-content.html',
         'responsive/search/command/CommandsTabView',
         'responsive/search/command/CommandsPaneView',
         'responsive/search/command/AddCommandView',
         'app/app.grocuser',
         'app/app.securityutility'
      ], 
         function($, Backbone, _,CommandCollection,ExampleCollection,ReferenceModel,Cache,Search,ExampleSearch,Template,CommandTabView, CommandPaneView,AddView,User,Security) {

	return Backbone.View.extend({
		el : 'div#page-content',
		selCommId : undefined,
		referenceName: undefined,
		initialize : function(options) {
			this.refId = options.refId;
			this.collection = new CommandCollection({refId:options.refId});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
			this.referenceModel = new ReferenceModel();
			this.referenceModel.url = "sherpa/service/reference/"+this.refId;
			this.referenceModel.fetch({success: this.showHeading});
			
			if (options.commId) {
			  this.selCommId = options.commId;
			}
			this.search = new Search();
			this.exampleSearch = new ExampleSearch();
			

		},

		events : {
			'click button#back-search-results' : 'commandBackToSearch',
			'click button#search' : 'doSearch',
    		'click button#new-command' : 'addCommand'
		},	
		
		addCommand : function() {

			if (Security.isAuthenticated()) {

			  	var _this = this;
			  	var _view = new AddView({commandId: _this.commId,model: _this.referenceModel});    			
			  	_view.render();	

			} else { // perform Login...

				var _this = this;
				var obj = {
					model : this.model
				};
				var callback = function() {

						_this.addCommand();

				};

				// not authenticated. login..
				require([ 'responsive/view/loginModalView' ], function(
						LoginView) {
					var _view = new LoginView().render();
					_view.onsuccess = callback;
					_view.show();
				});

			}

		},
		
		doSearch : function(e) {
	
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
					solutionCollection : _this.exampleSearch,
					active: 'reference'
				}).render();
				
			});
				
		},


		commandBackToSearch: function(e) {
			e.preventDefault();

		   	Backbone.history.navigate("#searchResults/"+Cache.searchText,{trigger:true});
		

		},

		add : function(model) {
			var tabView = new CommandTabView({model : model, selCommId: this.selCommId}).render();
			this.$('ul#nav-tabs').append(tabView.el);
			var paneView = new CommandPaneView({model : model, selCommId: this.selCommId}).render();
			this.$('div#tab-content').append(paneView.el);
		},
		
		reset : function(col) {
			this.$('ul#nav-tabs').empty();
			this.$('div#tab-content').empty();
			// if command id is not selected, then select first one
			if(!this.selCommId) {
		        if (col.length > 0) {
				 this.selCommId = col.at(0).get("id");
				 this.referenceName = col.at(0).get("reference").name;
		        }
		    }
			
			col.each(this.add, this);
		},
		
		showHeading : function(m) {
	        var $el = $("#command-name");
	        $el.empty();
            $el.append(m.get("name")+" <small>commands</small><i id='command-popover' class='icon-info-sign' href='#' data-toggle='popover'></i>");
            $("#command-popover").popover({
                trigger : 'hover',
                placement : 'left',
                html : true,
                title : "Attribution: " + m.get("attribution"),
                content : "<small>" + m.get("description") + "</small>"
            });
		},


		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.empty();
			$el.html(compiled_template({search:Cache.searchText,command: this.referenceName}));			
			$.Log.mark($el,"search/command/CommandsView.js -> search/command/Command-content.html",this.collection.toJSON());	
			return this;
		},
	});

});
