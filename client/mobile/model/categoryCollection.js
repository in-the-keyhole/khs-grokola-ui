define(['jquery', 'backbone', 'underscore', 'mobile/model/categoryModel'], 
function($, Backbone, _, CategoryModel) {
	return Backbone.Collection.extend({
		model : CategoryModel,
		url : 'sherpa?endpoint=CategoryEndpoint&action=categories',
		initialize : function() {
			$.mobile.showPageLoadingMsg();
			console.log('categories url:' + this.url);
			this.loadCategories();
			//var data = this.localGet();
			
		},
		loadCategories : function() {
			var self = this;
			$.getJSON(this.url, {
				}).success(function(data, textStatus, xhr) {
					console.log('categories json success');
					console.log(JSON.stringify(data));
					self.reset(data);
					self.localSave(data);
				}).error(function(data, textStatus, xhr) {
					console.log('error');
					console.log("data - " + JSON.stringify(data));
					console.log("textStatus - " + textStatus);
					console.log("xhr - " + JSON.stringify(xhr));
				}).complete(function() {
					console.log('json request complete');
					$.mobile.hidePageLoadingMsg();
				});
		},
		localSave : function(data) {
			var d = JSON.stringify(data);
			localStorage.setItem('CATEGORIES', d);
		},
		localGet : function() {			
			var d = localStorage.getItem('CATEGORIES');
		    data = JSON.parse(d);
		    return data;
	   },
	   localRemove : function(model){  
		   var target = this.models;
		   var f = function(m) { 	  
		   return m.toJSON().ticker == model.toJSON().ticker};
		   var result = _.reject(target,f);
		   this.localSave(result);
	   }
	   
				
	});
});
