define(['backbone'], function(Backbone) {
	return Backbone.Model.extend({
		defaults: {
			id: undefined,
			description:'',
			name:'',
			imageUrl: '',
			attribution: ''
		},
    });
});