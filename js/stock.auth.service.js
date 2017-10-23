(function () {
	// body...
	angular.module('stock_service', [])
	.service('loginservice', ['$http',function ($http) {
		this.authenticate= function (email,password) {
			// body...
			var credentials={'email':email,'password':password};
			$http.post("/login",credentials).then(function(response){
				return response
			},function(error){
				return error
			})


		}
		
	}])
})()