define(['backbone'],function(Backbone) {
	return Backbone.Model.extend({
		url: 'sherpa/service/index',
		type: 'post',
		defaults: {
			
		},
	});
});