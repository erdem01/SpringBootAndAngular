(function() {
	var routerModule = angular.module('RouterModule', ['ngRoute', 'AuthenticationModule']);
	routerModule.constant('loginPath','/login');
	routerModule.constant('helloPath','/hello');
	routerModule.constant('orderPath','/order');
	routerModule.factory('RouteService', ['$location', 'loginPath', 'helloPath', 'orderPath', function($location, loginPath, helloPath, orderPath) {
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
	routerModule.config(['$routeProvider', 'loginPath', 'helloPath', 'orderPath', function($routeProvider, loginPath, helloPath, orderPath) {
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
	routerModule.config(['$httpProvider', function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);
	var routeChangeModule = angular.module('RouteChangeModule', ['ngRoute', 'AuthenticationModule', 'RouterModule']);
	routeChangeModule.run(['$rootScope', 'AuthenticationHolderService', 'RouteService', function($rootScope, AuthenticationHolderService, RouteService) {
		$rootScope.$on("$routeChangeStart",function(event, next, current){
	        if(!AuthenticationHolderService.isLoggedIn()){
	        	RouteService.redirectToLogin();
	        	return;
	        }
	    });
	}]);
})();