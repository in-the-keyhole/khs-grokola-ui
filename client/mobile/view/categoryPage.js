define([
	'jquery', 
	'backbone', 
	'underscore', 
	'mobile/model/categoryCollection', 
	'mobile/view/categoryView',
	'text!mobile/template/categories.html'], 
	function($, Backbone, _, CategoryCollection, CategoryView, template) {
		
		var list = {};
		return Backbone.View.extend({
			id : 'category-list-page',
			initialize : function() {
				this.list = new CategoryCollection();
					
			},
		
					    
			render : function(eventName) {
				var compiled_template = _.template(template);
				var $el = $(this.el);
				$el.html(compiled_template());
				this.listView = new CategoryView({
					el : $('ul', this.el),
					collection : this.list
				});
				this.listView.render();
				return this;
			},
		});

});
