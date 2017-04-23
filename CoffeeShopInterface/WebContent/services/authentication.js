(function() {
	var module = angular.module('AuthenticationModule', ['ngCookies']);
	module.factory('AuthenticationHolderService', ['$cookies', function($cookies) {
		var authKey = 'authKey';
		var holdAuth = function(username, password) {
			var authData = 'Basic ' + btoa(username + ':' + password);
			// store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
			$cookies.putObject(authKey, authData, { expires: cookieExp });
		};
		var clearAuth = function() {
			$cookies.remove(authKey);
		};
		var gatherAuth = function() {
			return $cookies.get(authKey) || '';
		};
		var isLoggedIn = function() {
			if(gatherAuth()) {
				return true;
			} else {
				return false;
			}
		};
		return {
			holdAuth: holdAuth
			, clearAuth: clearAuth
			, gatherAuth: gatherAuth
			, isLoggedIn: isLoggedIn
		};
	}]);
	module.factory('AuthenticationService', ['$http', '$q', 'AuthenticationHolderService', function($http, $q, AuthenticationHolderService) {
		var login = function(username, password) {
			var postData = 'username=' + username + '&password=' + password;
			var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
			var deferred = $q.defer();
			var loginPromise = $http.post("/coffeeShopServ/login", postData, config).then(function(response) {
				AuthenticationHolderService.holdAuth(username, password);
				deferred.resolve(response);
			}).catch(function(data, status, headers, config) {
				deferred.reject("Login failed with status: " + status);
			});
			return deferred.promise;
		};
		var logout = function() {
			AuthenticationHolderService.clearAuth();
		};
		return {
			login: login,
			logout: logout
		};
	}]);
	module.factory('AuthInterceptor', ['$q', 'AuthenticationHolderService', '$log', function($q, AuthenticationHolderService, $log) {
		return {
			request: function(config) {
				var authData = AuthenticationHolderService.gatherAuth();
				$log.log('Auth: ' + authData);
				config.headers = config.headers || {};
				config.headers.Authorization = authData;
				return config;
			},
			requestError: function(rejection) {
				$log.log('Request error due to ', rejection);
				// Continue to ensure that the next promise chain
				// sees an error
				return $q.reject(rejection);
				// Or handled successfully?
				// return someValue
			},
			response: function(response) {
				$log.log('Response from server', response);
				// Return a promise
				return response || $q.when(response);
			},
			responseError: function(rejection) {
				$log.log('rejection.status ' + rejection.status);
				if (rejection.status === 401) {
					AuthenticationHolderService.clearAuth();
				}
				return $q.reject(rejection);
			}
		};
	}]);
	
})();