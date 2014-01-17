define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
         'text!responsive/template/command-tab.html'], 
         function($, Backbone, _,Command, Template) {

	return Backbone.View.extend({
		tagName : 'li',
		selCommId : undefined,

		initialize : function(options) {
			this.selCommId = options.selCommId;
		},
				
		render : function(eventName) {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			if ( this.model.id == this.selCommId) {
				this.trackView();
				$el.addClass("active");
			}
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"commandsTabView.js -> command-tab.html",this.model.toJSON());
			return this;
		},
	
		
		trackView : function() {
			console.log('Adding commId ' + this.model.id + ' to tracking cookie.');
			var cookieVal = $.cookie('COMMREF_RECENT');
			var newCookieVal = this.model.id;
			if ( cookieVal != null ) {
				var cookieIds = cookieVal.split(',');
				var idCount = 1;
				for (var i=0; i < cookieIds.length; i++) {
					if ( cookieIds[i] != this.model.id ) {
						newCookieVal = newCookieVal + ',' + cookieIds[i];
						idCount++;
					}
					if ( idCount == 6) {
						break;
					}
				}
				
			} else {
				newCookieVal = this.model.id;
			}
			console.log('Cookie value: ' + newCookieVal);
			$.cookie('COMMREF_RECENT', newCookieVal, {expires : 365});
		},
		
		
		
		
		
	});

});
