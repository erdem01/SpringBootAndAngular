describe('HomePageModule test', function() {
	var IndexController, RouteService, AuthenticationService, AuthenticationHolderService;
	var spyOnIsLoggedIn, spyOnRedirectToLogin, spyOnLogout;
	var $scope;
	beforeEach(module('HomePageModule'));
	beforeEach(inject(function($rootScope, _$q_, $controller, _RouteService_, _AuthenticationService_, _AuthenticationHolderService_) {
		$scope = $rootScope.$new();
		
		RouteService = _RouteService_;
		AuthenticationService = _AuthenticationService_;
		AuthenticationHolderService = _AuthenticationHolderService_;
		
		spyOnIsLoggedIn = spyOn(AuthenticationHolderService, 'isLoggedIn');
		spyOnRedirectToLogin = spyOn(RouteService, 'redirectToLogin');
		spyOnLogout = spyOn(AuthenticationService, 'logout');
		
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
	it('should check if logout make right calls!', function() {
		IndexController.logout();
		expect(spyOnRedirectToLogin).toHaveBeenCalled();
		expect(spyOnLogout).toHaveBeenCalled();
	});
});