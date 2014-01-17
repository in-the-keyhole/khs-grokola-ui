define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.category',
		'text!admin/template/add-category-modal.html',
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
			'click button#submit' : 'add-category'
		},
		
		'add-category' : function(event) {
			event.preventDefault();
			var obj = {
				async: false,
				url: 'sherpa/service/category',
				type: 'post',
				beforeSend: function (request)
				 { 
					SecurityUtility.populateRequestHeader(request);
				 },
			};
		    
			this.model.save({
				name: $('input#name').val(),
				description: $('input#description').val(),
				imageUrl: $('input#imageUrl').val()
			}, obj );
			this.hide();
			this.parent.parent.collection.add(this.model);
		},
		
		'hide' : function() {
			$(this.el).modal('hide');
			$(this.el).remove();
		},
		
		render : function() {
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			return this;
		},
	});

});
