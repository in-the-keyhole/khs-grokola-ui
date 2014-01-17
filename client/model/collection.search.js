define(['backbone',  'model/model.command'], function(Backbone, CommandModel) {
	return Backbone.Collection.extend({
		model: CommandModel,
		indexSearchText:'',
		base_url: 'sherpa/service/search/',
		url: '',
		performSearch: function(searchText){
		     this.indexSearchText = searchText;
	    	 this.url = this.base_url + searchText;
	   }
    });
});