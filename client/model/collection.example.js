define(['backbone', './model.example'], function(Backbone, Model) {
	return Backbone.Collection.extend({
		model : Model,
		url: 'sherpa/service/examples/',
        initialize : function(options) {
        	if ( options ) {
        		this.url = this.url + options.refId;
        	}
        },
	});
});
