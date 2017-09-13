(function() {
	var indexPageModule = angular.module('IndexPageModule', ['RouterModule', 'AuthenticationModule']);
	indexPageModule.controller('IndexController', ['RouteService', 'AuthenticationService', 'AuthenticationHolderService', '$log', function(RouteService, AuthenticationService, AuthenticationHolderService, $log) {
		var self = this;
		self.isLoggedIn = function() {
			return AuthenticationHolderService.isLoggedIn();
		};
		self.logout = function() {
			AuthenticationService.logout().then(function() {
				RouteService.redirectToLogin();
            }, function(errorMessage) {
				$log.log(errorMessage);
			});
		};
	}]);
	var module = angular.module('CoffeeShopAppModule', ['RouteChangeModule', 'RouterModule', 'AuthenticationModule', 'IndexPageModule', 'LoginPageModule', 'HelloPageModule', 'OrderPageModule']);
})();