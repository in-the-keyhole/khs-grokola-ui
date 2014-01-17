define([ 'app/app.grocuser' ], function() {
	var GrocUser = function() {
		var token = '';
		var userid = '';

		//make private
		return {
			
			getToken : function() {
				return token;
			},
			getUserId : function() {
				return userid;
			},
			setToken : function(newToken) {
				token = newToken;
			},
			setUserId : function(newUserId) {
				userid = newUserId; 
			},
		};
	};
	if (GrocUser.prototype._instance) {
		return GrocUser.prototype._instance;
	}
	GrocUser.prototype._instance = new GrocUser;
	return GrocUser.prototype._instance;

});