// alert("hello")
(function(){
var app= angular.module('stocksapp', ['ngMaterial','ui.router','stockmodule','toaster','ngAnimate','ngStorage']);
// app.run(['$localStorage','$scope','$rootScope','$stateChangeStart',function ($localStorage,$scope,$rootScope,$stateChangeStart) {
// 	$rootScope.$on('$stateChangeStart', function (event) {
// 		if ($localStorage.authtoken==null) {
// 			$state.go('login',{})
// 		}
// 		// body...
// 	})
	
// }])


	// modules****************
	angular.module('stockmodule', ['stock.controllers','stockService','stock.routers.js']);

	// services***************
	angular.module('stockService', [])
	.service('loginservice', ['$http',function ($http) {
		this.authenticate= function (email,password) {
			// body...
			console.log(email)

			var credentials={'email':email,'password':password};
			$http.post("/login",credentials).then(function(response){
				return response
			},function(error){
				return error
			})


		}
		
	}])
	.service('commentService', ['$http',function ($http) {

		this.getComments= function(){
			$http.get('comments api').then(function (response) {
				// body...
				return response;
			},function (error) {
				return error;
				// body...
			})
		}
		
	}])

	// contorllers***************



	var stockcontrol= angular.module('stock.controllers', []);
	

	stockcontrol.controller('loginpage', ['$scope', function ($scope) {
		
	}])


	stockcontrol.controller('logincontroller', ['$scope','toaster','loginservice','$mdDialog','$state',function ($scope,toaster,loginservice,$mdDialog,$state) {
		
		$scope.login=function(){
				var email=$scope.email;
				var pwd=$scope.password;
				// if(email== "" || pwd== ""){
				// 	toaster.error("Error", "Please check email and password again");
				// 	return;
				// }
				// var result=loginservice.authenticate(email,pwd);
				// if (result){
				// 	$localStorage.access= "validlogin";
				// 	$state.go("",{})
				// }

				$state.go("login",{
					u:email,
					p:pwd
				})

		}

	}])

	stockcontrol.controller('basiclandingCtrl',['$scope','$mdDialog','$rootScope',function ($scope,$mdDialog,$rootScope) {
		
		$rootScope.iflogin=false;
		


	}])

	stockcontrol.controller('indexCtrl', ['$scope','$localStorage','$state','$rootScope', function ($scope,$localStorage,$state,$rootScope)
	 {
		$scope.logos= $localStorage.recent;
		$scope.percentage=50;
		$rootScope.iflogin=true;

		$scope.companies=[
		{
			title:"Amazon",
			percentage:"60",
			location:"India",
			keyskills:"ABC",
			jobtype:"DEVOPS",
			salary:"1234",
			rating:'4.5'

		}
		,{
		title:"DELL",
			percentage:"80",
			location:"India",
			keyskills:"ABC",
			jobtype:"DEVOPS",
			salary:"1234",
			rating:'4.2'
		 },{
		title:"HAVIC",
			percentage:"90",
			location:"India",
			keyskills:"ABC",
			jobtype:"DEVOPS",
			salary:"1234",
			rating:'4.0'
	  }]

	  $scope.searchlogo= function(searchItem) {
	  	// body...
	  	console.log(searchItem)
	  	$state.go("")
	  }
	  }])

	stockcontrol.controller('signupcontroller',['$scope','toaster', function ($scope,toaster) {
		if($scope.email==" " || $scope.password==" "||$scope.Confirmpassword==" "){
			toaster.error("Error", "Please check email and password again");
			return;

		}else if($scope.password!=$scope.Confirmpassword){
			toaster.error("Error", "password mismatch");
			return;
		}
	}])
	stockcontrol.controller('individualCtrl',['$scope',function ($scope) {
		$scope.comments=[];

	    $scope.post_comment= function() {
	    	// console.log($scope.comment)
	         if ($scope.comment != '') {
	             $scope.comments.unshift({"name":"android",
	             						  "content":$scope.comment});
	             $scope.comment = "";
	         }
	         
	     }
	     


		$scope.comments=[
		{
			"name":"android",
			"content":"ios is ......................................."
		},
		{
			"name":"android",
			"content":"ios is ......................................."
		},
		{
			"name":"android",
			"content":"ios is ......................................."
		}]
		
	}])
	stockcontrol.controller('logoutController', ['$scope','$state','$window','$localStorage', function ($scope,$state,$window,$localStorage) {

		// $window.location.href = '/';
		$state.go('loginpage',{});
		
	}])

	stockcontrol.controller('landingpagecontroller', ['$scope','$localStorage', function ($scope,$localStorage) {
		$scope.lists=['3MINDIA','company2','company3','company4','company5','...'];
		// if ($localStorage.recent==null || $localStorage.recent==undefined) {
		// 	$localStorage.recent=[];
		// }
		// $scope.results=$localStorage.recent;
		
	}])

	stockcontrol.controller('logoDetailsController', ['$scope','$stateParams','$http','$localStorage',function ($scope,$stateParams,$http,$localStorage) {
		$scope.logo=$stateParams.logo;
		if($localStorage.recent==null){
			$localStorage.recent=[]
		}
		// console.log($localStorage.recent)
		// $scope.titles = [];
		var recents=$localStorage.recent;
		var flag= true;
		if ($scope.logo==""){
			flag=false;
		}else{
			for (var i=0;i<recents.length;i++){
				if(recents[i]==$scope.logo){
					flag=false;
					break;
				}
			}

		}
		if (flag==true){
			recents.push($scope.logo)
			$localStorage.recent= recents
			
		}

		$http({
			url: "../NSE/"+$scope.logo+".json",
			method: "GET"

		}).then(function (response) {
			// body...
			console.log("success error", response)
			$scope.titles=response.data.dataset.column_names;
			$scope.logodatas= response.data.dataset.data;
		},function (error) {
			console.log($scope.logo)
			console.log(error)
		})
		
	}])





	// routes************

	angular.module('stock.routers.js', [])
	.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider,$injector, $location) {
		$stateProvider
		.state("loginpage",{
			url:"",
			controller:'basiclandingCtrl',
			// templateUrl:"views/loginpage.html",
			
		})

		.state("login",{
			url: "/login/:u/:p",
			// templateUrl:"views/login.html",
			controller:"logincontroller",
			resolve:{
				result:['loginservice','$stateParams',function (loginservice,$stateParams) {
					// body...
					var username=$stateParams.u;
					var pwd= $stateParams.p;
					var response= loginservice.authenticate(username,pwd);
					return response;
				}]
			}
		})
		
		
		.state('logoData',{
			url:"/:logo",
			templateUrl:"views/logoDetails.html",
			controller:"logoDetailsController"
		})

		.state('userlanding',{
			url:"/userlanding",
			templateUrl:"views/userlanding.html",
			controller:"indexCtrl"
		})

		.state('logout',{
			url:"/userlanding",
			// template:"views/userlanding.html",
			controller:"logoutController"
		})
		.state('individual',{
			url:"/individual",
			templateUrl:"views/individualLogo.html",
			controller:"individualCtrl"
		})
		$urlRouterProvider.otherwise(function ($injector, $location) {
			// body...
			console.log("Could not find " + $location);
            // $location.path('');
		})

	}])

})();

