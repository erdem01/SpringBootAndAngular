(function() {
	var module = angular.module('HelloPageModule', ['AuthenticationModule', 'RouterModule']);
	module.controller('HelloController', ['RouteService', 'AuthenticationService', '$log', function(RouteService, AuthenticationService, $log) {
		self = this;
		self.logout = function() {
			AuthenticationService.logout();
			RouteService.redirectToLogin();
		}
	}]);
})();