define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
		'text!admin/template/edit-command-modal.html',
		'markitup',
        'markitup_set',
		 'app/app.securityutility'], 
		function($, Backbone, _,Model,Template, SecurityUtility) {

	return Backbone.View.extend({
		className: 'modal modal-bigger fade',
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
				description: $('textarea#description').val(),
				options: $('textarea#options').val(),
				example: $('textarea#example').val()
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
			$(this.el).find('#description').markItUp(mySettings);
			$(this.el).find('#options').markItUp(mySettings);
			$(this.el).find('#example').markItUp(mySettings);
			return this;
		},
	});

});
