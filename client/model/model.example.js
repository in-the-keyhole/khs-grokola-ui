define(['backbone'],function(Backbone) {
	return Backbone.Model.extend({
		urlRoot: 'sherpa/service/example/',
		
		defaults: {
			id: undefined,
			description:'',
			solution:'',
			short_solution:'',
			short_description:'',
			tags:''
		},
		 
		populateShortSolution : function(model) {
			var newSol = null;
			var tempSol = null;
			if (model.get("solution")) {
				tempSol = model.get("solution").substr(0, 80);
				 newSol = tempSol.concat(tempSol.substring(0, tempSol.lastIndexOf(' ')));
				 newSol = newSol.concat("...");
			}
			model.set({short_solution: newSol});
		},
		
		populateShortDesc : function(model) {
			var newSol = null;
			var tempSol = null;
			if (model.get("description")) {
				tempSol = model.get("description").substr(0, 80);
				 newSol = tempSol.concat(tempSol.substring(0, tempSol.lastIndexOf(' ')));
				 newSol = newSol.concat("...");
			}
			model.set({short_description: newSol});
		},
	
		formatUserDate :  function() {
			    var date = this.get("lastUpdated");
			    var user = this.get("lastUpdatedby");
			    var day = date.dayOfMonth;
			    var month = date.month + 1; //Months are zero based
			    var year = date.year;
			    var hour = date.hourOfDay;
			    var minute = date.minute;
			    var value = user+" | "+day + "-" + month + "-" + year+" at "+hour+":"+minute;
			    this.set({formattedUserDate: value});
		},
		
		commands : function() {             
	            var commands = this.get("tags"); 
	            var array = commands.split(",");
                this.set({commands: array });
		
		}
		
	});
});