define(['backbone', 'model/model.category'], function(Backbone, Model) {
	return Backbone.Collection.extend({
        model: Model,
        url: 'sherpa/service/categories'
    });
});