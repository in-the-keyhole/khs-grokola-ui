define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.reference',
 		'text!admin/template/edit-reference-modal.html',
		 'app/app.securityutility'], 

		function($, Backbone, _,Model,Template, SecurityUtility) {

	return Backbone.View.extend({
		className: 'modal fade',
		show: function() {
			$(this.el).modal('show');
		},
		
		events : {
			'click button#close' : 'hide',
			'click button#cancel' : 'hide',
			'click button#submit' : 'save'
		},
		
		'save' : function(event) {
			event.preventDefault();
			var obj = {
				async: false,
				beforeSend: function (request)
				 {  
					SecurityUtility.populateRequestHeader(request);
				 },
			};
			this.model.save({
				name: $('input#name').val(),
				description: $('input#description').val(),
				imageUrl: $('input#imageUrl').val(),
				attribution: $('input#attribution').val()
			}, obj );
			this.hide();
			this.parent.render();
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
