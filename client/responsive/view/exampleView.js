define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'responsive/view/exampleCommentsView',
         'responsive/view/commandTagView',
         'text!responsive/template/example-view.html',
         'app/app.securityutility',], 
         function($, Backbone, _,Example, CommentsView, TagsView, Template, Security) {

	return Backbone.View.extend({
		
		el: 'div#examples-content',
		
		initialize : function(options) {
			this.model = new Example({id : options.exampleId});
			var _this = this;
			this.model.fetch();
		    this.model.once("change", this.render, this);
		},
		
		
		editExample : function() {

			if (Security.isAuthenticated()) {

				var _this = this;
				require([ 'responsive/view/editExampleModalView',
						'model/model.example' ], function(ModalView, Command) {
					var _view = new ModalView({
						model : _this.model
					}).render();
					_view.parent = _this;
					_view.show();
				});

			} else { // perform Login...

				var obj = {
					model : this.model
				};
				var callback = function() {

					require([ 'responsive/view/editExampleModalView' ],
							function(ModalView) {
								var _view = new ModalView(obj).render();
								_view.parent = this;
								_view.show();
							});
				}

				// not authenticated. login..
				require([ 'responsive/view/loginModalView' ], function(
						LoginView) {
					var _view = new LoginView().render();
					_view.onsuccess = callback;
					_view.show();
				});

			}

		},
		
		
				
		render : function(eventName) {
			this.model.formatUserDate();
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el,"exampleView.js -> example-view.html",this.model.toJSON());
			var commentsView = new CommentsView({exampleId: this.model.get("id")});
			commentsView.render();
			var refId = this.model.toJSON().reference.id;
			var tagsView = new TagsView({tags:this.model.get("tags"),refId: refId});
			//tagsView.render();

			return this;
		},
	});

});
