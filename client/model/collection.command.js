define(['backbone', './model.command'], function(Backbone, Model) {
	return Backbone.Collection.extend({
		model : Model,
		url: 'sherpa/service/commands/',
        initialize : function(options) {
        	if ( options ) {
        		this.url = this.url + options.refId;
        	}
        },
	});
});
