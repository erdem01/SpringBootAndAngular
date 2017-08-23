(function() {
	var module = angular.module('HomePageModule', ['RouterModule', 'AuthenticationModule', 'LoginPageModule', 'HelloPageModule', 'OrderPageModule']);
	module.controller('IndexController', ['RouteService', 'AuthenticationService', 'AuthenticationHolderService', function(RouteService, AuthenticationService, AuthenticationHolderService) {
		var self = this;
		self.isLoggedIn = function() {
			AuthenticationHolderService.isLoggedIn();
		};
		self.logout = function() {
			AuthenticationService.logout();
			RouteService.redirectToLogin();
		};
	}]);
})();