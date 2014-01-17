define(['jquery', 'backbone', 'underscore', 'mobile/model/referenceModel'], 
function($, Backbone, _, CategoryModel) {
	return Backbone.Collection.extend({
		model : CategoryModel,
		url : 'sherpa?endpoint=ReferenceEndpoint&action=referencesForCategory',
		initialize : function() {
			$.mobile.showPageLoadingMsg();
			console.log('categories url:' + this.url);
			// add category id
			this.url = this.url + '&categoryId='+ window.admin.routers.workspaceRouter.category.id;
			this.loadReferences();
			//var data = this.localGet();
			
		},
		loadReferences : function() {
			var self = this;
			$.getJSON(this.url, {
				}).success(function(data, textStatus, xhr) {
					console.log('references json success');
					console.log(JSON.stringify(data));
					self.reset(data);				
				}).error(function(data, textStatus, xhr) {
					console.log('error');
					console.log("data - " + JSON.stringify(data));
					console.log("textStatus - " + textStatus);
					console.log("xhr - " + JSON.stringify(xhr));
				}).complete(function() {
					console.log('json request complete');
					$.mobile.hidePageLoadingMsg();
				});
		}

				
	});
});
