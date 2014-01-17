define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
		'text!admin/template/delete-reference-modal.html',
		 'app/app.securityutility'], 
		function($, Backbone, _,Model,Template, SecurityUtility) {

	return Backbone.View.extend({
		className: 'modal fade',
		show: function() {
			$(this.el).modal('show');
		},
		
		events : {
			'click button#closeDeleteReference' : 'hide',
			'click button#cancelDeleteReference' : 'hide',
			'click button#deleteReference' : 'deleteReference'
		},
		
		'deleteReference' : function(event) {
			event.preventDefault();
			var obj = {
					beforeSend: function (request)
					 {   
						SecurityUtility.populateRequestHeader(request);
					 },
				};
			this.model.destroy(obj);
			this.hide();
			this.parent.remove();
		},
		
		'hide' : function() {
			$(this.el).modal('hide');
			$(this.el).remove();
		},
		
		render : function() {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			return this;
		},
	});

});