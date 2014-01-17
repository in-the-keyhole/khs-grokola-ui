define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
		'text!responsive/template/edit-command-modal.html',
		'app/app.securityutility',
		'markitup',
        'markitup_set'
         ], 
		function($, Backbone, _,Model,Template,Security) {

	return Backbone.View.extend({
		className: 'modal modal-bigger fade',
		show: function() {
			$(this.el).modal('show');
			
			// Added this for correct vertical position
			// This there's a bootstrap modal bug. Does not 
			// work when resized...might have to calculate
		    $(this.el).modal().css('margin', '0 0 0 -380px');
		    $(this.el).modal().css('width', '800px');
			
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
				 {   // add secure token an userid to request header
					Security.populateRequestHeader(request);	
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
