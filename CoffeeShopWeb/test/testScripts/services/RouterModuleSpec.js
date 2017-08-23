describe('RouterModule test', function() {
	var $location, $route, $httpProvider, $rootScope, RouteService;
	var mockAuthenticationHolderService;
	var loggedIn;
	beforeEach(module('RouterModule', function (_$httpProvider_, $provide) {
		$httpProvider = _$httpProvider_;
		mockAuthenticationHolderService = {
			isLoggedIn: function() { return loggedIn; }
		};
		$provide.value('AuthenticationHolderService', mockAuthenticationHolderService);
	}));
	beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _RouteService_) {
		$location = _$location_;
		spyOn($location, 'path');
		$route = _$route_;
		$rootScope = _$rootScope_;
		RouteService = _RouteService_;
	}));
	it('should check redirect to login is working right.', function() {
		RouteService.redirectToLogin();
		expect($location.path).toHaveBeenCalledWith('/login');
	});
	it('should check redirect to hello is working right.', function() {
		RouteService.redirectToHello();
		expect($location.path).toHaveBeenCalledWith('/hello');
	});
	it('should check redirect to order is working right.', function() {
		RouteService.redirectToOrder();
		expect($location.path).toHaveBeenCalledWith('/order');
	});
	it('should check routing configurations', function() {
		var loginRoute = $route.routes['/login'];
		expect(loginRoute.controller).toBe('LoginController');
		expect(loginRoute.controllerAs).toBe('ctrl');
		expect(loginRoute.templateUrl).toBe('pages/login/login.view.html');
		
		var helloRoute = $route.routes['/hello'];
		expect(helloRoute.controller).toBe('HelloController');
		expect(helloRoute.controllerAs).toBe('ctrl');
		expect(helloRoute.templateUrl).toBe('pages/hello/hello.view.html');
		
		var orderRoute = $route.routes['/order'];
		expect(orderRoute.controller).toBe('OrderPageController');
		expect(orderRoute.controllerAs).toBe('ctrl');
		expect(orderRoute.templateUrl).toBe('pages/order/order.view.html');
		
		expect($route.routes[null].redirectTo).toBe('/order');
	});
	it('should check authentication interceptor is registered.', function() {
		RouteService.redirectToOrder();
		expect($httpProvider.interceptors[0]).toBe('AuthInterceptor');
	});
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