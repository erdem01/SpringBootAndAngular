describe('LoginPageModule test', function() {
	var $q;
	var LoginController, AuthenticationService, RouteService;
	var deferred, $scope;
	beforeEach(module('LoginPageModule'));
	beforeEach(inject(function($rootScope, _$q_, $controller, _AuthenticationService_, _RouteService_) {
		$scope = $rootScope.$new();
		$q = _$q_;
		deferred = _$q_.defer();
		AuthenticationService = _AuthenticationService_;
		spyOn(AuthenticationService, 'login').and.returnValue(deferred.promise);
		RouteService = _RouteService_;
		spyOn(RouteService, 'redirectToOrder');
		LoginController = $controller('LoginController', {
			$scope: $scope
			, AuthenticationService: AuthenticationService
			, RouteService: RouteService
		});
	}));
	it('should check if login function call is correct when login is successful!', function() {
		var username = 'username';
		var password = 'password';
		LoginController.username = username;
		LoginController.password = password;
		deferred.resolve('response from login');
		LoginController.login(username, password);
		$scope.$apply();
		expect(AuthenticationService.login).toHaveBeenCalledWith(username, password);
		expect(RouteService.redirectToOrder).toHaveBeenCalled();
	});
	it('should check if login function call is correct when login is failed!', function() {
		var username = 'username';
		var password = 'password';
		LoginController.username = username;
		LoginController.password = password;
		deferred.reject('response from login');
		LoginController.login(username, password);
		$scope.$apply();
		expect(AuthenticationService.login).toHaveBeenCalledWith(username, password);
		expect(RouteService.redirectToOrder).not.toHaveBeenCalled();
	});
});