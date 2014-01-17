define([ 'jquery', 
         'backbone', 
         'underscore',
         'model/collection.comment',
         'model/model.comment',
         'responsive/view/exampleCommentView',
         'text!responsive/template/example-comments.html',
         'app/app.securityutility',], 
         function($, Backbone, _, CommentCollection, Comment, CommentView, Template, Security) {

	return Backbone.View.extend({
		
		el: 'div#example-comments',
		exampleId: undefined,
		initialize : function(options) {
			this.exampleId = options.exampleId;
			this.collection = new CommentCollection({exampleId:options.exampleId});
			this.collection.fetch();
			this.collection.bind("reset", this.reset, this);
			this.collection.bind("add", this.add, this);
		},
		
		events : {
			'click button#submit' : 'addComment'
		},
		
		add : function(model) {
			var cView = new CommentView({model : model}).render();
			this.$('div#comment-list').append(cView.el);
		},
		
		reset : function(col) {
			this.$('div#comment-list').empty();
			col.each(this.add, this);
		},
		
		'addComment' : function(event) {
			event.preventDefault();
			var obj = {
				async: false,
				url: 'sherpa/service/comment/' + this.exampleId,
				type: 'post',
				beforeSend: function (request)
				 { 
					Security.populateRequestHeader(request);
				 },
			};
			
			var _this = this;
			if (Security.isAuthenticated()) {
				var comment = new Comment();
				comment.save({text: $('textarea#comment').val()}, obj );
				_this.add(comment);
			} else {
				var callback = function() {
					var comment = new Comment();
					comment.save({text: $('textarea#comment').val()}, obj );
					_this.add(comment);
				};
				
				// not authenticated. login..
				require(['responsive/view/loginModalView'], function (LoginView) {
		    		var _view = new LoginView().render();
		    		_view.onsuccess = callback;
					_view.show();
		    	});
			}
		},
				
		render : function(eventName) {
			//this.model.formatUserDate();
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			$.Log.mark($el,"exampleView.js -> example-view.html",this.collection.toJSON());	
			return this;
		},
	});

});
