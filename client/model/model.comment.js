define(['backbone'],function(Backbone) {
	return Backbone.Model.extend({
		urlRoot: 'sherpa/service/comment/',
		
		defaults: {
			id: undefined,
			text:''
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
		}
		
		
		
	});
});