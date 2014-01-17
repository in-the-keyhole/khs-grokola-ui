define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
		'text!admin/template/add-command-modal.html',
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
			
		    var m  = new Model();
			var obj = {
				async: false,
				url: 'sherpa/service/command/'+this.parent.refId,
				type: 'post',
				beforeSend: function (request)
				 {  
					SecurityUtility.populateRequestHeader(request);
				 },
			};
		    m.save({
				name: $('input#name').val(),
				description: $('textarea#description').val(),
				options: $('textarea#options').val(),
				example: $('textarea#example').val()
			}, obj );
			this.hide();
			this.parent.parent.collection.add(m);
			alert(m.getId());
		},
		
		'hide' : function() {
			$(this.el).modal('hide');
			$(this.el).remove();
		},
		
		render : function() {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			$(this.el).find('#description').markItUp(mySettings);
			$(this.el).find('#options').markItUp(mySettings);
			$(this.el).find('#example').markItUp(mySettings);
			return this;
		},
	});

});
