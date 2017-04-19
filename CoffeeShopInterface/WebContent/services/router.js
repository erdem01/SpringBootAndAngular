(function() {
	var module = angular.module('RouterModule', ['ngRoute', 'AuthenticationModule']);
	module.constant('loginPath','/login');
	module.constant('helloPath','/hello');
	module.constant('orderPath','/order');
	module.factory('RouteService', ['$location', 'loginPath', 'helloPath', 'orderPath', function($location, loginPath, helloPath, orderPath) {
		var redirectToLogin = function() {
			$location.path(loginPath);
		};
		
		var redirectToHello = function() {
			$location.path(helloPath);
		};
		
		var redirectToOrder = function() {
			$location.path(orderPath);
		};
		
		return {
			redirectToLogin: redirectToLogin
			, redirectToHello: redirectToHello
			, redirectToOrder: redirectToOrder
		};
	}]);
	module.config(['$routeProvider', 'loginPath', 'helloPath', 'orderPath', function($routeProvider, loginPath, helloPath, orderPath) {
		$routeProvider
		
        .when(helloPath, {
        	controller: 'HelloController',
        	templateUrl: 'pages/hello/hello.view.html',
            controllerAs: 'ctrl'
        })

        .when(loginPath, {
            controller: 'LoginController',
            templateUrl: 'pages/login/login.view.html',
            controllerAs: 'ctrl'
        })
        
        .when(orderPath, {
        	controller: 'OrderPageController',
        	templateUrl: 'pages/order/order.view.html',
            controllerAs: 'ctrl'
        })

        .otherwise({ redirectTo: orderPath });
	}]);
	module.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);
	module.run(['$rootScope', '$location', 'AuthenticationHolderService', 'RouteService', function($rootScope, $location, AuthenticationHolderService, RouteService) {
		$rootScope.$on("$routeChangeStart",function(event, next, current){
	        if(!AuthenticationHolderService.isLoggedIn()){
	        	RouteService.redirectToLogin();
	        	return;
	        }
	    });
	}]);
})();