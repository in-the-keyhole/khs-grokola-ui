define([ 'jquery', 'backbone', 'underscore', 'model/collection.command',
		'text!responsive/template/command-tags.html' ], function($, Backbone,
		_, Collection,Template) {

	return Backbone.View.extend({
		el : 'div#tags',
		tags : null,
		firstTime : false,
		refId: null,
		collection: null,
		source: null,

		initialize : function(options) {

			this.tags = options.tags.split(',')
			this.refId = options.refId;
			this.source = new Array(this.tags.length);
			
			for ( var i in this.tags) {
			  var col = new Collection();
			  col.url = 'sherpa/service/command/'+this.refId+'/'+this.tags[i];
			  //col.bind("reset",this.reset,this);
			 // col.bind("add",this.addpopup,this);	
			  col.fetch({success: this.reset} );
			}


		},

		events : {
			'hover a' : 'command'
		},

		command : function(event) {


			event.preventDefault();
			
			 var id = event.target.id;
			 $('#' + id).popover({html:true,trigger:'hover',placement:'right'});

			/*if (!this.firstTime) {

				
				for ( var i in this.tags) {
					
					var col = new Collection();
					col.url = 'sherpa/service/command/'+this.refId+'/'+this.tags[i];
					var _this = this;
					col.fetch({success:function(col,response,options) { _this.loadcommand(_this.tags[i],col); }});
 					  var id = event.target.id;
				 	  $('#' + this.tags[i]).popover({
						// title : 'test',
						// html : true,
						// content : '<pre>Test</br> more </br> more </pre>'
					  }); 

					   this.firstTime = true; 
				     }

				    $('#' + id).popover('show'); 

			  } */

		},
		
		reset : function(col, response, options) {
			
			var itr = function(model, index, list) { 
					var compiled_template = _.template(Template);
					var $el = $('div#tags');
					var json = list.at(index).toJSON();
					var example = json.example.replace(/\"/g, '\'');
					//example = example + "</br> <a href=#search/command/"+json.reference.id+"/"+json.id+">Go To</a>";
					json['example'] = example;
					json['options'] = json.options.replace(/\"/g, '\'');
					json['description'] = json.description.replace(/\"/g, '\'');
							
					var html = compiled_template(json);
					$el.append(html);
				
			};
			

			_.each(col,itr,this);
		},

		
		addpopup : function(model, index, list) {
	   
			var compiled_template = _.template(Template);
			var $el = $('div#tags');
			var html = compiled_template(model.toJSON());
			$el.append(html);

		},


		loadcommand: function(tag,commands) {
	//$( "#contents ul.people li" );
		   $('.popover-title').val('Source Goes here...');	
            /*$('#' + tag).popover({
						 title : 'test',
						 html : true,
						 content : '<pre>Test</br> changed </br> changed </pre>'
					  }); 		   
		   */


        },



		render : function(eventName) {

			var compiled_template = _.template(Template);
			var $el = $(this.el);
			var t = {
				tags : this.tags
			};
			//$el.html(compiled_template(t));
			$.Log.mark($el, "commandTagView.js -> command-tags.html", t);

			return this;
		},

		

	});

});