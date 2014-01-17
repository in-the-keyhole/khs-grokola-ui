define(['backbone', './model.reference.overview'], function(Backbone, Model) {
	return Backbone.Collection.extend({
        model: Model,
        url: 'sherpa/service/overview/reference',
        initialize : function(options) {
         
        },
        
    });
});