describe('AuthenticationService test', function() {
	var $httpBackend, AuthenticationService, AuthenticationHolderService;
	var arrangeResult;
	beforeEach(module('AuthenticationModule'));
	beforeEach(inject(function(_$httpBackend_, _AuthenticationService_, _AuthenticationHolderService_) {
		$httpBackend = _$httpBackend_;
		AuthenticationService = _AuthenticationService_;
		AuthenticationHolderService= _AuthenticationHolderService_;
		arrangeResult = function(username, password, respCode, resultObj) {
			var postData = 'username=' + username + '&password=' + password;
			$httpBackend.expectPOST("/coffeeShopServ/login", postData, function(headers) {
				return headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8;';
			}).respond(respCode, resultObj);
		};
	}));
	it('should execute login successfully!', function() {
		var username = "username";
		var password = "password";
		var respCode = 200;
		var expected = {field: 'value'};
		arrangeResult(username, password, respCode, expected);
		spyOn(AuthenticationHolderService, 'holdAuth').and.callFake(function() {});
		var result;
		AuthenticationService.login(username, password).then(function(response) {
			result = response;
		}).catch(function(response) {
			fail(response);
		});
		$httpBackend.flush();
		expect(result.data).toEqual(expected);
		expect(AuthenticationHolderService.holdAuth).toHaveBeenCalledWith(username, password);
	});
	it('should fail during login!', function() {
		var username = "username";
		var password = "password";
		var respCode = 500;
		var expected = {field: 'value'};
		arrangeResult(username, password, respCode, expected);
		spyOn(AuthenticationHolderService, 'holdAuth').and.callFake(function() {});
		var result;
		AuthenticationService.login(username, password).then(function(response) {
			fail(response);
		}).catch(function(response) {
			result = response;
		});
		$httpBackend.flush();
		expect(result.status).toEqual(respCode);
		expect(result.data).toEqual(expected);
	});
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});