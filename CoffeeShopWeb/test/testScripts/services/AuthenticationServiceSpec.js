describe('AuthenticationService test', function() {
	var $httpBackend, AuthenticationService;
	beforeEach(module('AuthenticationModule'));
	beforeEach(inject(function(_$httpBackend_, _AuthenticationService_) {
		$httpBackend = _$httpBackend_;
		AuthenticationService = _AuthenticationService_;
	}));
	it('should execute login successfully!', function() {
	});
});