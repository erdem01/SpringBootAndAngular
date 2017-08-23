describe('AuthenticationHolderService test', function() {
	var authKey;
	var $cookies, AuthenticationHolderService;
	beforeEach(module('AuthenticationModule'));
	beforeEach(inject(function(_$cookies_, _AuthenticationHolderService_) {
		authKey = 'authKey';
		$cookies = _$cookies_;
		$cookies.remove(authKey);
		AuthenticationHolderService = _AuthenticationHolderService_;
	}));
	it('should execute holdAuth successfully!', function() {
		expect($cookies.get(authKey)).toBeUndefined();
		var expectedUserName = "expectedUserName";
		var expectedPassword = "expectedPassword";
		AuthenticationHolderService.holdAuth(expectedUserName, expectedPassword);
		var storedAuthCookie = $cookies.get(authKey);
		expect(storedAuthCookie).toBeDefined();
		var cookieRegexp = /^"Basic (.*)"$/g;
		var matchArr = cookieRegexp.exec(storedAuthCookie);
		var decoded = atob(matchArr[1]);
		expect(decoded).toEqual(expectedUserName + ":" + expectedPassword);
	});
	it('should execute clearAuth successfully!', function() {
		$cookies.putObject(authKey, 'authData');
		AuthenticationHolderService.clearAuth();
		expect($cookies.get(authKey)).toBeUndefined();
	});
	it('should gatherAuth return existing cookie!', function() {
		var authData = 'authData';
		$cookies.putObject(authKey, authData);
		var result = AuthenticationHolderService.gatherAuth();
		expect(result).toEqual('"' + authData + '"');
	});
	it('should gatherAuth return nothing when no cookie exist!', function() {
		var result = AuthenticationHolderService.gatherAuth();
		expect(result).toEqual('');
	});
	it('should isLoggedIn return true when user logged in!', function() {
		$cookies.putObject(authKey, 'authData');
		var result = AuthenticationHolderService.isLoggedIn();
		expect(result).toEqual(true);
	});
	it('should isLoggedIn return false when user not logged in!', function() {
		var result = AuthenticationHolderService.isLoggedIn();
		expect(result).toEqual(false);
	});
});