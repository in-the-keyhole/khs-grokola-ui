define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.command',
         'text!responsive/search/command/command-add-view.html',
         'model/collection.cache',
         'app/app.securityutility',
     	'markitup',
        'markitup_set'], 
         function($, Backbone, _,Command, Template,Cache,Security) {

	return Backbone.View.extend({
		el: 'div#tab-content',
		initialize: function(options) {
	     this.model = options.model;
	     this.commandId = options.commandId;
	     this.referenceId = options.model.id;
	     var sol = $('#command');
	 	 sol.empty();
	     
	  	},
	  	events : {
		   	'click button#cancel' : 'cancel',
		   	'click button#save' : 'save'
		},
		
		save : function(e)  {
	        e.preventDefault();
	        
	        // validate model
	       var errors = false;
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



	        var _this = this;
	        _this.model = new Command();
	        
	        var obj = {
				async: false,
				url: 'sherpa/service/command/'+_this.referenceId,
				type: 'post',
				beforeSend: function (request)
				 {   // add secure token an userid to request header
					Security.populateRequestHeader(request);	
				 },
				 success:  function(m,response,options) {
					 _this.model = m;
					 _this.doCommandView();
				 
				 }
				 
			};
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
						commId : _this.commandId,
						refId : _this.referenceId
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
			$el.html(compiled_template());
			$el.find('#description-text').markItUp(mySettings);
			$el.find('#options-text').markItUp(mySettings);
			$el.find('#example-text').markItUp(mySettings);
			$.Log.mark($el,"search/AddSolutionView.js -> search/solution-add-view.html");	
			return this;
		}

          });
	
        });
	
