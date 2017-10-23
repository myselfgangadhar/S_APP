angular.module("stocksapp",["ngMaterial","ui.router","stockmodule","toaster","ngAnimate","ngStorage"]),(void angular.module("stock_service",[]).service("loginservice",["$http",function(o){this.authenticate=function(t,e){var r={email:t,password:e};o.post("/login",r).then(function(o){return o},function(o){return o})}}]))(function(){var o=angular.module("stock.controllers",[]);o.controller("mainController",["$scope",function(o){o.name="gangadhar"}]),o.controller("logincontroller",["$scope","toaster","loginservice",function(o,t,e){o.login=function(o,r){""!=o&&""!=r?e.authenticate(o,r):t.error("Error","Please check email and password again")}}]),o.controller("signupcontroller",["$scope","toaster",function(o,t){" "!=o.email&&" "!=o.password&&" "!=o.Confirmpassword?o.password==o.Confirmpassword||t.error("Error","password mismatch"):t.error("Error","Please check email and password again")}]),o.controller("landingpagecontroller",["$scope",function(o,t){o.lists=["company1","company2","company3"],o.results=t.recent}]),o.controller("logoDetailsController",["$scope","$stateParams","$http","$localStorage",function(o,t,e,r){o.logo=t.logo,(r.recent="")&&(r.recent=[]),r.recent.append(o.logo),e.get("../NSE/"+o.logo+".json",function(t){o.titles=t.data.dataset.column_names,o.logodatas=t.data.dataset.data},function(o){console.log(o)})}])})()(function(){angular.module("stock.routers.js",[]).config(["$stateProvider","$urlRouterProvider",function(o,t){o.state("landingpage",{url:"/",template:"views/signup.html",controller:"signupcontroller"}).state("login",{url:"/login",templateUrl:"views/login.html",controller:"logincontroller"}).state("signup",{url:"/signup",templateUrl:"views/signup.html",controller:"signupcontroller"}).state("logoData",{url:"/:logo",templateUrl:"views/logoDetails.html",controller:"logoDetailsController"}),t.otherwise({redirectTo:"/"})}])})()(function(o,t){t.module("stockmodule",["stock.controllers","stock_service","stock.routers.js"])})(window,window.angular);