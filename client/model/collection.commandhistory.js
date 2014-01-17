define(['backbone', 'model/model.commandhistory'], function(Backbone, Model) {
	return Backbone.Collection.extend({
		model : Model,
		url: 'sherpa/service/commandhistory/',
					
        initialize : function(options) {
        	if ( options ) {
        		this.url = this.url + options.commandId;
        	}
        },
	});
});
