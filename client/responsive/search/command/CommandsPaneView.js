define([ 'jquery', 'backbone', 'underscore', 'model/model.command',
		'text!responsive/search/command/command-tab-pane.html',
		'app/app.securityutility', 'model/collection.commandhistory',
		'responsive/view/commandHistoryView',
		'responsive/search/command/EditCommandView'], function($, Backbone, _,
		Command, Template, Security, CommandHistoryCollection,
		CommandHistoryView,EditView) {

	return Backbone.View.extend({
		tagName : 'div',
		className : 'tab-pane',
		selCommId : undefined,
		commandCollection : undefined,
		shown : false,

		initialize : function(options) {
			this.selCommId = options.selCommId;

		},

		events : {
			'click i#edit' : 'editCommand',
			'click a#command-hist' : 'commandHist'
			
		},

		commandHist : function() {
			var $this = this;
			if (!$this.shown) {
				
				$this.commandCollection = new CommandHistoryCollection();
				$this.commandCollection.initialize({
					commandId : this.model.id
				});
				$this.commandCollection.fetch({
					success : function() {
						var tabView = new CommandHistoryView({
							collection : $this.commandCollection
						}).render();
						$(this.el).append(tabView.el);
					}
				});
				$this.shown = true;
			}else{
				$this.$("div#hist_content").empty();
				$this.shown = false;
			}

		},
		editCommand : function() {

			if (Security.isAuthenticated()) {

			  	var _this = this;
			  	var _view = new EditView({model: _this.model});    			
			  	_view.render();	

			} else { // perform Login...

				var obj = {
					model : this.model
				};
				var callback = function() {

					require([ 'responsive/view/editCommandModalView' ],
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
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			if (this.model.id == this.selCommId) {
				$el.addClass('active');
			}
			$el.attr('id', 'tab' + this.model.id);
			this.model.format();
			$el.html(compiled_template(this.model.toJSON()));
			$.Log.mark($el, "search/command/commandsPaneView.js -> search/command/command-tab-pane.html",
					this.model.toJSON());
			return this;
		},
	});

});
