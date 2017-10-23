(function (){
	angular.module('stock.routers.js', [])
	.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state("landingpage",{
			url:"/",
			template:"views/signup.html",
			// templateUrl:"views/signup.html",
			controller:"signupcontroller"
		})

		.state("login",{
			url: "/login",
			templateUrl:"views/login.html",
			controller:"logincontroller"
		})
		
		.state("signup",{
			url:"/signup",
			templateUrl:"views/signup.html",
			controller:"signupcontroller"
		})

		
		.state('logoData',{
			url:"/:logo",
			templateUrl:"views/logoDetails.html",
			controller:"logoDetailsController"
		})
		$urlRouterProvider.otherwise({ redirectTo: '/' })

	}])
})()