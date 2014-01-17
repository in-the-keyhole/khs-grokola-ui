define([
	'jquery', 
	'backbone', 
	'underscore', 
	'mobile/model/referenceCollection', 
	'mobile/view/categoryEntriesView',
	'text!mobile/template/reference-entries.html'],   
	function($, Backbone, _, ReferenceCollection, CategoryEntryView, template) {
		
		var list = {};  
		return Backbone.View.extend({   
			id : 'reference-entries-page',
			initialize : function() {
				this.list = new ReferenceCollection();		
				this.bind("swiperight",_.bind(this.render, this));
				var reference = window.admin.routers.workspaceRouter.category;
				this.parentDescription =reference.toJSON().description;
			},
		
			render : function(eventName) {  
				var compiled_template = _.template(template);
				var $el = $(this.el);
				$el.html(compiled_template());
				var parDesc = $(this.el).find('#referenceParent');
				parDesc.text(this.parentDescription);
				this.listView = new CategoryEntryView({
					el : $('ul', this.el),
					collection : this.list
				});
				this.listView.render();
				return this;
			},   
		});

});
