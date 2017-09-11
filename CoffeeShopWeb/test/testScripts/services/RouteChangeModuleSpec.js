describe('RouteChangeModule test', function() {
	var $location, $rootScope;
	var mockAuthenticationHolderService;
	var loggedIn;
	beforeEach(module('RouteChangeModule', function ($provide) {
		mockAuthenticationHolderService = {
			isLoggedIn: function() { return loggedIn; }
		};
		$provide.value('AuthenticationHolderService', mockAuthenticationHolderService);
	}));
	beforeEach(inject(function(_$location_, _$rootScope_) {
		$location = _$location_;
		spyOn($location, 'path');
		$rootScope = _$rootScope_;
	}));
	it('should change to login page if user is not logged int.', function() {
		loggedIn = false;
		$rootScope.$broadcast("$routeChangeStart");
		expect($location.path).toHaveBeenCalledWith('/login');
	});
	it('should change to login page if user is not logged int.', function() {
		loggedIn = true;
		$rootScope.$broadcast("$routeChangeStart");
		expect($location.path).not.toHaveBeenCalled();
	});
});