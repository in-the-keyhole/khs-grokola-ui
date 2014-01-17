define(['backbone', './model.reference'], function(Backbone, Model) {
	return Backbone.Collection.extend({
        model: Model,
        url: 'sherpa/service/names/reference'
        
    });
});