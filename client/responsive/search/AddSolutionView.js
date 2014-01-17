define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/search/solution-add-view.html',
         'model/collection.cache',
         'app/app.securityutility',
     	'markitup',
        'markitup_set'], 
         function($, Backbone, _,Example, Template,Cache,Security) {

	return Backbone.View.extend({
		el: 'div#solution',
		initialize: function(options) {
	     this.model = options.model;
	     this.referenceId = options.model.get("reference").id;
	     var sol = $('#solution');
	 	 sol.empty();
	     
	  	},
	  	events : {
		   	'click button#cancel' : 'cancel',
		   	'click button#save' : 'save'
		},
		
		save : function(e)  {
	        e.preventDefault();
	   
	        
         if (Security.isAuthenticated()) {	 
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
	        _this.model = new Example();
	        
	        var obj = {
				async: false,
				url: 'sherpa/service/example/'+_this.referenceId,
				type: 'post',
				beforeSend: function (request)
				 {   // add secure token an userid to request header
					Security.populateRequestHeader(request);	
				 },
				 success:  function(m,response,options) {
					 _this.model = m;
					 _this.doExampleView();
				 
				 }
				 
			};
			this.model.save({
				description: $('input#description').val(),
				solution: $('textarea#solution-text').val()
			}, obj );
			
			} else {
				
				var _this = this;
				var obj = {
					model : this.model
				};
				var callback = function() {
						_this.save();
				};

				// not authenticated. login..
				require([ 'responsive/view/loginModalView' ], function(
						LoginView) {
					var _view = new LoginView().render();
					_view.onsuccess = callback;
					_view.show();
				});
			
			}
			
	
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
			$el.html(compiled_template());
			$el.find('#solution-text').markItUp(mySettings);
			$.Log.mark($el,"search/AddSolutionView.js -> search/solution-add-view.html");	
			return this;
		}

          });
	
        });
	
