define([ 'jquery', 'backbone', 'underscore', 'model/collection.search',
		 'responsive/view/searchResultsCarouselInnerRowView',
		'text!responsive/template/search-results-modal.html' ], function($,
		Backbone, _, SearchCollection,  SearchResultsCarouselInnerRowView,
		Template) {

	return Backbone.View.extend({
		className : 'modal modal-responsive fade',
		tagName : "ul",
		id : 'search-results-page',
		
		initialize : function() { 
			this.collection.bind('reset', this.render, this);
		},
	
		
		
		show : function() {
			$(this.el).modal('show');
			this.$('div#carouselInner').hide();
			this.$('h4#size_disp').hide();
			this.$('h4#non_size_disp').show();
			
			
		}, 

		events : {
			'click button#close' : 'hide',
			'click button#cancel' : 'hide',
			'click a#searchCommandLink': 'hide',
			'click a#searchReferenceLink': 'hide'
		},

		'hide' : function() {
			$(this.el).modal('hide');
			$(this.el).remove();
		},

		render : function(eventName) {
			
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template({size:this.collection.length}));

			
			var counter = 0;
			_.each(this.collection.models, function(aModel) {
				if((counter%4)==0){
					var end;
					if(counter + 4  > _.size(this.collection)){
						end = _.size(this.collection) - counter;
					}else{
						end = 4;
					}
					this.subcollection = new SearchCollection();
					
					for (var i=0; i<end; i++){
						this.subcollection.add(this.collection.models[counter + i]);
					}
					var nextDivClass;
					if(counter == 0){
						nextDivClass = "item active";
					}else{
						nextDivClass = "item ";
					}
					this.listView = new SearchResultsCarouselInnerRowView({
						collection : this.subcollection,
						divnumber :counter,
						className: nextDivClass
					});
					var renderedList = this.listView.render();
					this.$('div#carouselInner').append(renderedList.el);
					
				};
				counter = counter +1;
				
			}, this);
			
			this.$('div#carouselInner').show();
			this.$('h4#size_disp').show();
			this.$('h4#non_size_disp').hide();
			$.Log.mark($el,"addSearchResultsModalView.js ->search-results-modal.html",this.collection.toJSON());
			
			return this;
			
		},
	});

});