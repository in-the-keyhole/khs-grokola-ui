define(['backbone'], function(Backbone) {
	return Backbone.Model.extend({
		urlRoot: 'sherpa/service/category',
		defaults: {
			id: undefined,
			name: '',
			description:'',
			imgUrl: ''
		},
    });
});