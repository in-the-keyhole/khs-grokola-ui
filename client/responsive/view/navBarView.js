define(
		[ 'jquery', 'backbone', 'underscore', 'model/collection.category',
				'model/collection.command', 'model/collection.search',
				'text!responsive/template/navbar-categories.html',
				'responsive/view/navBarCatView',
				'responsive/view/navBarMoreView',
				'responsive/view/navBarMoreCatView',
				'responsive/view/navBarSignedInView',
				'app/app.grocuser',
				'model/collection.example.search'],
		function($, Backbone, _, CategoryCollection, CommandCollection, Search,
				Template, NavCatView, MoreView, MoreCatView, NavBarSignedInView,  GrocUser,ExampleSearch) {

			return Backbone.View
					.extend({
						el : 'div#nav-bar',
						initialize : function() {
							this.search = new Search();
							this.exampleSearch = new ExampleSearch();
							this.collection = new CategoryCollection();
							this.collection.fetch();
							this.collection.bind("reset", this.reset, this);
							this.collection.bind("add", this.add, this);
						},

						events : {
							'click button#navSearchButton' : 'callNavSearch',
							'click a#login' : 'loginModal',
							'click a#logoff' : 'logoff',
							'click a#returnHome' : 'returnHome'
						},
						returnHome : function(e) {
							window.admin.routers.workspaceRouter.navigate(
									"#home", {
										trigger : true
									});
						},
						callNavSearch : function(e) {
								e.preventDefault();
								var text = this.$("input#navSearchText").val();
								if (text == null || text == '') {
									text = this.$("input#navSearchText").attr("placeholder");
								}
								this.search.performSearch(text);
								this.search.fetch();
								
								this.exampleSearch.performSearch(text);
								this.exampleSearch.fetch();
								 
								var _this = this;
								require([ 'responsive/view/homeSearchResultsView',
										 ], function(ResultsView)
								{
									var _view = new ResultsView({
										collection : _this.search,
										solutionCollection : _this.exampleSearch
									}).render();
									
								});
				

	
						},

						add : function(model) {
							var catNum = this.$('ul#navbar-categories li').length;
							console.log('Category count: ' + catNum);
							if (catNum < 3) {
								var view = new NavCatView({
									model : model
								}).render();
								this.$('ul#navbar-categories').append(view.el);
							} else {
								if (catNum == 3) {
									var moreView = new MoreView().render();
									this.$('ul#navbar-categories').append(
											moreView.el);
								}
								var moreCatView = new MoreCatView({
									model : model
								}).render();
								this.$('ul#navbar-references').append(
										moreCatView.el);
							}
						},

						reset : function(col) {
							this.$('ul#navbar-categories').empty();
							col.each(this.add, this);
						},

						'loginModal' : function(eventName) {
							var _this = this;
							require([ 'responsive/view/loginModalView' ],
									function(ModalView) {
										var _view = new ModalView().render();
										_view.parent = _this;
										_view.show();
									});
						},

						'logoff' : function(eventName) {
							console.log('logging out');
							GrocUser.setUserId('');
							GrocUser.setToken('');
							$('a#login').show();
							$('ul#logged_in').empty();
							
						},
						render : function(eventName) {
							var compiled_template = _.template(Template);
							var $el = $(this.el);
							$el.html(compiled_template());
							if (typeof (GrocUser.getToken()) != 'undefined' && GrocUser.getToken() != '') { 
								$('a#login').hide();
								var view = new NavBarSignedInView({
									
								}).render();

								$('ul#logged_in').append(view.el);
								
							}
							$.Log.mark($el,
									"navBarView.js -> navbar-categories.html");
							return this;
						}

					});

		});
