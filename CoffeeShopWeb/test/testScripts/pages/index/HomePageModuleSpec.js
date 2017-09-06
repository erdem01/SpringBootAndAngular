describe('HomePageModule test', function() {
	var IndexController, RouteService, AuthenticationService, AuthenticationHolderService;
	var spyOnIsLoggedIn, spyOnRedirectToLogin, spyOnLogout;
	var $scope, $q;
	var deferred;
	beforeEach(module('HomePageModule'));
	beforeEach(inject(function($rootScope, _$q_, $controller, _RouteService_, _AuthenticationService_, _AuthenticationHolderService_) {
		$scope = $rootScope.$new();
		$q = _$q_;
		deferred = _$q_.defer();
		
		RouteService = _RouteService_;
		AuthenticationService = _AuthenticationService_;
		AuthenticationHolderService = _AuthenticationHolderService_;
		
		spyOnIsLoggedIn = spyOn(AuthenticationHolderService, 'isLoggedIn');
		spyOnRedirectToLogin = spyOn(RouteService, 'redirectToLogin');
		spyOnLogout = spyOn(AuthenticationService, 'logout').and.returnValue(deferred.promise);
		
		IndexController = $controller('IndexController', {
			$scope: $scope
			, RouteService: RouteService
			, AuthenticationService: AuthenticationService
			, AuthenticationHolderService: AuthenticationHolderService
		});
	}));
	it('should check if is logged in function returns value from AuthenticationHolderService!', function() {
		spyOnIsLoggedIn.and.returnValue(true);
		expect(IndexController.isLoggedIn()).toEqual(true);
		spyOnIsLoggedIn.and.returnValue(false);
		expect(IndexController.isLoggedIn()).toEqual(false);
	});
	it('should check if redirects after a successful logout!', function() {
		deferred.resolve('response from logout');
		IndexController.logout();
		$scope.$apply();
		expect(spyOnRedirectToLogin).toHaveBeenCalled();
		expect(spyOnLogout).toHaveBeenCalled();
	});
	it('should check if not redirects after a failed logout!', function() {
		deferred.reject('response from logout');
		IndexController.logout();
		$scope.$apply();
		//Test case fails. Fix it.
		expect(spyOnRedirectToLogin).not.toHaveBeenCalled();
		expect(spyOnLogout).toHaveBeenCalled();
	});
});