describe('AuthenticationService test', function() {
	var $httpBackend, AuthenticationService;
	var arrangeResult;
	beforeEach(module('AuthenticationModule'));
	beforeEach(inject(function(_$httpBackend_, _AuthenticationService_) {
		$httpBackend = _$httpBackend_;
		AuthenticationService = _AuthenticationService_;
		arrangeResult = function(username, password, respCode, resultObj) {
			var postData = 'username=' + username + '&password=' + password;
			$httpBackend.expectPOST("/coffeeShopServ/login", postData, function(headers) {
				return headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8';
			}).respond(respCode, resultObj);
		};
	}));
	it('should execute login successfully!', function() {
	});
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});