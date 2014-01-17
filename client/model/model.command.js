define(['backbone'],function(Backbone) {
	return Backbone.Model.extend({
		defaults: {
			id: undefined,
			name:'',
			description:'',
			short_description:'',
			options:'',
			example:''				
		},
		 
		populateShortDesc : function(model) {
			
			var newDesc = null;
			var tempDesc = null;
			if (model.get("description")) {
				 tempDesc = model.get("description").substr(0, 80);
				 newDesc = tempDesc.concat(tempDesc.substring(0, tempDesc.lastIndexOf(' ')));
				 newDesc = newDesc.concat("...");
			}

			model.set({short_description: newDesc});

		},
		
		format :  function() {
			  
			    var date = this.get("lastUpdated");
			    var user = this.get("lastUpdatedby");
			    var day = date.dayOfMonth;
			    var month = date.month + 1; //Months are zero based
			    var year = date.year;
			    var hour = date.hourOfDay;
			    var minute = date.minute;
			    var value = user+" - "+day + "-" + month + "-" + year+" at "+hour+":"+minute;
			this.set({formattedDateTime: value});
			
		}
		
		
		
	});
});