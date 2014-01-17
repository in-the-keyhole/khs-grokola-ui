define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/search/solution-edit-view.html',
         'model/collection.cache',
         'app/app.securityutility',
     	'markitup',
        'markitup_set'], 
         function($, Backbone, _,Example, Template,Cache,Security) {

	return Backbone.View.extend({
		el: 'div#solution',
		initialize: function(options) {
	     this.model = options.model;
	     var sol = $('#solution');
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
           var name = $('input#description').val();
           if (name.trim() === "" ) {
        	    var field = $('div#description-input');
        	    field.addClass("error");
        	    var message = $('span#description-error');
        	    message.text("Description Required");
        	    errors = true;
           }
           
            var desc = $('textarea#solution-text').val();
           if (desc.trim() === "" ) {
        	    var field = $('div#solution-input');
        	    field.addClass("error");
        	    var message = $('span#solution-error');
        	    message.text("Solution Required");
                errors = true;
           }

           if (errors) return;


	        var _this = this;
	        var obj = {
				async: false,
				beforeSend: function (request)
				 {   // add secure token an userid to request header
					Security.populateRequestHeader(request);	
				 },
				 success:  function() {
					 _this.doExampleView();
				 
				 }
				 
			};
			this.model.save({
				description: $('input#description').val(),
				solution: $('textarea#solution-text').val()
			}, obj );
	
		},
		
		doExampleView: function(e) {
          
	            var _this = this;
				require([ 'responsive/search/SolutionExampleView'
						 ], function(SolutionView)
				{
					var _view = new SolutionView({
						exampleId : _this.model.id
					}).render();
					
				});
               
       
		},

		cancel : function(e) {
		
	           e.preventDefault();
	           var _this = this;
			   _this.doExampleView();
	           

         },		
		render : function() {
			
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template(this.model.toJSON()));
			$el.find('#solution-text').markItUp(mySettings);
			$.Log.mark($el,"search/EditSolutionView.js -> search/solution-edit-view.html",this.model.toJSON());	
			return this;
		}

          });
	
        });
	
