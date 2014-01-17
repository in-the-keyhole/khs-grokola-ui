define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/search/command/command-edit-view.html',
         'model/collection.cache',
         'app/app.securityutility',
     	'markitup',
        'markitup_set'], 
         function($, Backbone, _,Example, Template,Cache,Security) {

	return Backbone.View.extend({
		el: 'div#tab-content',
		initialize: function(options) {
	     this.model = options.model;
	     var sol = $('#command');
	 	 sol.empty();
	     
	  	},
	  	events : {
		   	'click button#cancel' : 'cancel',
		   	'click button#save' : 'save'
		},
		
		save : function(e)  {
	        e.preventDefault();
	       
	       var errors = false;
	       // validate model
           var name = $('input#name').val();
           if (name.trim() === "" ) {
        	    var field = $('div#name-input');
        	    field.addClass("error");
        	    var message = $('span#name-error');
        	    message.text("Name Required");
        	    errors = true;
           }

           var desc = $('textarea#description-text').val();
           if (desc.trim() === "" ) {
        	    var field = $('div#description-input');
        	    field.addClass("error");
        	    var message = $('span#description-error');
        	    message.text("Description Required");
                errors = true;
           }

           if (errors) return;

	        
	         // validate model
           var name = $('input#name').val();
           if (name.trim() === "" ) {
        	    var field = $('div#name-input');
        	    field.addClass("error");
        	    var message = $('span#name-error');
        	    message.text("Name Required");
        	    return;
           }


	       var _this = this;
	       var obj = {
				async: false,
				beforeSend: function (request)
				 {   // add secure token an userid to request header
					Security.populateRequestHeader(request);	
				 },
				 success:  function() {
					 _this.doCommandView();
				 
				 }
				 
			};
	      
	        var example = $('textarea#example-text').val().replace(/\"/g, '\'');
			this.model.save({
				name: $('input#name').val(),
				description: $('textarea#description-text').val(),
			    options: $('textarea#options-text').val(),
				example: $('textarea#example-text').val()
			}, obj ); 
	        
		
		},
		
		doCommandView: function(e) {
          
	            var _this = this;
				require([ 'responsive/search/command/CommandView'
						 ], function(CommandView)
				{
					var _view = new CommandView({
						refId : _this.model.get("reference").id,
						commId : _this.model.get("id")
					}).render();
					
				});
               
       
		},

		cancel : function(e) {
		
	           e.preventDefault();
	           var _this = this;
			   _this.doCommandView();
	           

         },		
		render : function() {
			
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$el.find('#description-text').markItUp(mySettings);
			$el.find('#example-text').markItUp(mySettings);
			$el.find('#options-text').markItUp(mySettings);
			$.Log.mark($el,"search/command/EditCommandView.js -> search/command-edit-view.html",this.model.toJSON());	
			return this;
		}

          });
	
        });
	
