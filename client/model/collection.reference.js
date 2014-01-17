define(['backbone', './model.reference'], function(Backbone, Model) {
	return Backbone.Collection.extend({
        model: Model,
        url: 'sherpa/service/references/',
        initialize : function(options) {
            this.url = this.url + options.catId;
        },
        
    });
});