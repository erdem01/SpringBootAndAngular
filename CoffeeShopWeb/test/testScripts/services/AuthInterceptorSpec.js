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
	it('should execute requestError successfully!', function() {
//		var expected = 'expected';
//		var result;
//		var asd = AuthInterceptor.requestError(expected).then(function(response) {
//			fail("Service returned with an error! Response: " + response);
//		}).catch(function(response) {
//			result = response;
//		}).finally(function() {
//			console.info('asdasd');
//		});
//		console.info(asd);
//		expect(result).toEqual(expected);
	});
});