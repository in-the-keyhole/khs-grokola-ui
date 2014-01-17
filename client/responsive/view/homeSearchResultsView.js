define([ 'jquery', 
         'backbone', 
         'underscore',
         'model/collection.search',
         'model/model.command',
         'text!responsive/template/home-search-results.html',
         'responsive/view/commandResultsThumbView',
         'responsive/view/solutionResultsThumbView',
         'model/collection.cache'
         ], 
         function($, Backbone, _,Search, Model, Template,CommandReferenceView,SolutionReferenceView,Cache) {

	return Backbone.View.extend({
		el : 'div#page-content',
		solutionCollection : null,
		initialize : function(options) {
			//this.results = options.results;
			this.solutionCollection = options.solutionCollection;
			var _this = this;
			if (options.active) {
			  this.active = options.active;	
			} else {
			  this.active = "solution";
			}
			
			this.solutionCollection.fetch();
			this.solutionCollection.bind("reset", this.resetSolution, this);
			//this.solutionCollection.bind("add", this.addSolution, this);	
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			//this.collection.bind("add", this.reset, this);

		},
		
		events : {
			'click a#solutions' : 'solutions',
			'click a#references' : 'references',
			'submit form#resultSearch' : 'search'
		},
		
		search: function(event) {
			event.preventDefault();
			 $('ul#references-thumbnail').empty();
			  $('ul#solutions-thumbnail').empty();
			var text = this.$("input#homesearchtext").val();
			if (text == null || text == '') {
				text = this.$("input#homesearchtext").attr("placeholder");
			}
			
			Cache.searchText = text;
			var _this = this;
			this.collection.performSearch(text);
			this.solutionCollection.performSearch(text);
			//this.collection.fetch({success: function(col,rep,opt) { _this.solutionCollection.fetch()}});	
			this.collection.fetch();
			this.solutionCollection.fetch();		

		},
		
		addSolution : function(model) {
			var tabView = new SolutionReferenceView({model : model});
			tabView.render();
			this.$('ul#solutions-thumbnail').append(tabView.el);
		},
		
		resetSolution : function(col) {
	         var _this = this;
	

			if (this.active === "solution") {  
	       		$('div#references').hide();
	       		$('#solutions').tab('show');	
	       		$('div#solutions').addClass('active');
	       		$('div#solutions').show();
	       	}		


			 col.each(_this.addSolution, _this);
		},


		add : function(model) {
			var tabView = new CommandReferenceView({model : model}).render();
			tabView.render();
			this.$('ul#references-thumbnail').append(tabView.el);
		},
		
		reset : function(col) {
	         var _this = this;
	         
	       if (this.active === "reference") {	         
	        	$('div#solutions').hide();
	        	$('#references').tab('show');
	        	$('div#references').addClass('active');
				$('div#references').show();
			}
				 
	         
			 col.each(_this.add, _this);
		},

	
		solutions : function(e) {
			 e.preventDefault();
			 $('div#references').hide();
			 $('#solutions').tab('show');
			 $('div#solutions').addClass('active');
			  $('div#solutions').show();

		},
		
		references : function(e) {
			 e.preventDefault();
			  $('div#solutions').hide();
		      $('#references').tab('show');
		       $('div#references').addClass('active');
		        $('div#references').show();
         },

		render : function(eventName) {
		
			var $el = $(this.el);
			$el.empty();			
			var compiled_template = _.template(Template);
			$el.html(compiled_template());
			var searchInput = $('#homesearchtext');
			searchInput.attr('value',this.collection.indexSearchText);
			
			


			$.Log.mark($el,"homeSearchResultsView.js -> home-search-results.html");	
			return this;
		}
		
	
	});

});
