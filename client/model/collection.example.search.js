define(['backbone',  'model/model.example'], function(Backbone, ExampleModel) {
	return Backbone.Collection.extend({
		model: ExampleModel,
		indexSearchText:'',
		base_url: 'sherpa/service/search/example/',
		url: '',
		performSearch: function(searchText){
	       this.indexSearchText = searchText;
		   this.url = this.base_url + searchText;
	   }
    });
});