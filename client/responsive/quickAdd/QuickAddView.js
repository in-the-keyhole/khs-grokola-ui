define([ 'jquery', 
         'backbone', 
         'underscore', 
         'model/model.example',
         'text!responsive/quickAdd/add-solution-view.html',
         'model/collection.cache',
         'model/collection.reference.all',
         'app/app.securityutility',
     	'markitup',
        'markitup_set'], 
         function($, Backbone, _,Example, Template,Cache,References,Security) {

	return Backbone.View.extend({
		el: 'div#quick-add',
		initialize: function(options) {
		   this.collection = new References();
		   this.collection.bind('reset',this.setReferences,this);
		   this.collection.fetch();
		
	  	},
	  	
	  	setReferences : function(col) {
	  			var list = $('select#reference-list');
	  			col.each(function (model) {
	  			    list.append($('<option>', { 
	  			        value: model.get("id"),
	  			        text : model.get("name") 
	  			    }));
	  			});
	           

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
           Cache.reference = referenceId;
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
	        var list = $('select#reference-list');
	        var referenceId = list.val();
	        _this.model = new Example();
	        
	        var obj = {
				async: false,
				url: 'sherpa/service/example/'+referenceId,
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
	        	Backbone.history.navigate("#home",{trigger:true});
	           

         },		
		render : function() {
			
			var compiled_template = _.template(Template);
			var $el = $(this.el);
			$el.html(compiled_template());
			$el.find('#solution-text').markItUp(mySettings);
			$.Log.mark($el,"quickAdd/QuickAddView.js -> quickAdd/solution-add-view.html");	
			return this;
		}

          });
	
        });
	
