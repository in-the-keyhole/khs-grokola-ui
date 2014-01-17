define([ 'jquery', 'backbone', 'underscore', 'model/model.command',
		'text!responsive/template/command-tab-pane.html',
		'app/app.securityutility', 'model/collection.commandhistory',
		'responsive/view/commandHistoryView' ], function($, Backbone, _,
		Command, Template, Security, CommandHistoryCollection,
		CommandHistoryView) {

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
			'click i#edit-command' : 'editCommand',
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
				require([ 'responsive/view/editCommandModalView',
						'model/model.command' ], function(ModalView, Command) {
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
			$.Log.mark($el, "commandsPaneView.js -> command-tab-pane.html",
					this.model.toJSON());
			return this;
		},
	});

});
