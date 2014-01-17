define(['jquery', 'backbone', 'underscore', 'mobile/model/categoryModel'], 
function($, Backbone, _, CommandModel) {
	return Backbone.Collection.extend({
		model : CommandModel	
				
	});
});
