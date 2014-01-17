define([ 'app/app.securityutility', 'app/app.grocuser' ], function(Model,
		GrocUser) {

	var SecurityUtility = function() {
		return {

			populateRequestHeader : function(request) {
				request.setRequestHeader("token", GrocUser.getToken());
			    request.setRequestHeader("userid", GrocUser.getUserId());
			},
			
			isAuthenticated :function() {
				return GrocUser.getToken() != null && GrocUser.getToken() != "";
			},
			
		};
	};
	if (SecurityUtility.prototype._instance) {
		return SecurityUtility.prototype._instance;
	}
	SecurityUtility.prototype._instance = new SecurityUtility;
	return SecurityUtility.prototype._instance;

});