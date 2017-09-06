(function() {
	var module = angular.module('HomePageModule', ['RouterModule', 'AuthenticationModule', 'LoginPageModule', 'HelloPageModule', 'OrderPageModule']);
	module.controller('IndexController', ['RouteService', 'AuthenticationService', 'AuthenticationHolderService', '$log', function(RouteService, AuthenticationService, AuthenticationHolderService, $log) {
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
})();