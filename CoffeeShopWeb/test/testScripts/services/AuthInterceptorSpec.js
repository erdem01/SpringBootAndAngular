describe('AuthInterceptor test', function() {
	var AuthInterceptor;
	var mockAuthenticationHolderService;
	var config;
	beforeEach(module('AuthenticationModule'));
	beforeEach(module(function($provide) {
		mockAuthenticationHolderService = {
			clearAuth: function() {}
			, gatherAuth: function() {}
		};
		$provide.value('AuthenticationHolderService', mockAuthenticationHolderService);
	}));
	beforeEach(inject(function(_AuthInterceptor_) {
		AuthInterceptor = _AuthInterceptor_;
		config = {
			headers: {
				Authorization: null
			}
		};
	}));
	it('should execute request successfully when header field exist!', function() {
		var authData = 'authData';
		spyOn(mockAuthenticationHolderService, 'gatherAuth').and.returnValue(authData);
		expect(config.headers.Authorization).toBeNull();
		var result = AuthInterceptor.request(config);
		expect(mockAuthenticationHolderService.gatherAuth).toHaveBeenCalled();
		expect(result.headers.Authorization).toEqual(authData);
	});
	it('should execute request successfully when header field not exist!', function() {
		var authData = 'authData';
		spyOn(mockAuthenticationHolderService, 'gatherAuth').and.returnValue(authData);
		config.headers = null;
		var result = AuthInterceptor.request(config);
		expect(mockAuthenticationHolderService.gatherAuth).toHaveBeenCalled();
		expect(result.headers.Authorization).toEqual(authData);
	});
	it('should check if authentication info cleared when an unauthenticated call occured!', function() {
		spyOn(mockAuthenticationHolderService, 'clearAuth');
		var rejection = {status: 401};
		var result = AuthInterceptor.responseError(rejection);
		expect(mockAuthenticationHolderService.clearAuth).toHaveBeenCalled();
	});
	it('should check if authentication info is not cleared when any error occured!', function() {
		spyOn(mockAuthenticationHolderService, 'clearAuth');
		var rejection = {status: 500};
		var result = AuthInterceptor.responseError(rejection);
		expect(mockAuthenticationHolderService.clearAuth).not.toHaveBeenCalled();
	});
});