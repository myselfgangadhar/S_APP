(function () {
	var stockcontrol= angular.module('stock.controllers', []);
	stockcontrol.controller('mainController', ['$scope', function ($scope) {
		$scope.name= "gangadhar"

	}])

	stockcontrol.controller('logincontroller', ['$scope','toaster','loginservice',function ($scope,toaster,loginservice) {
		$scope.login=function(email,pwd){
				if(email== "" || pwd== ""){
					toaster.error("Error", "Please check email and password again");
					return;
				}
				loginservice.authenticate(email,pwd);

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


	stockcontrol.controller('landingpagecontroller', ['$scope', function ($scope,$localStorage) {
		$scope.lists=['company1','company2','company3'];
		$scope.results=$localStorage.recent;
		
	}])

	stockcontrol.controller('logoDetailsController', ['$scope','$stateParams','$http','$localStorage', function ($scope,$stateParams,$http,$localStorage) {
		$scope.logo=$stateParams.logo;
		console.log("hello")
		if($localStorage.recent=""){
			$localStorage.recent=[]
		}
		$localStorage.recent.append($scope.logo);
		$http.get("../NSE/"+$scope.logo+".json",function (data) {
			// body...
			$scope.titles=data.data.dataset.column_names;
			$scope.logodatas= data.data.dataset.data;
		},function (error) {
			console.log(error)
		})
		
	}])
})()