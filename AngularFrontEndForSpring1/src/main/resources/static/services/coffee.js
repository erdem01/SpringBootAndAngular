(function() {
	var module = angular.module('CoffeeModule', []);
	module.factory('CoffeeService', ['$http', '$q', function($http, $q) {
		var gatherCoffees = function() {
			var deferred = $q.defer();
			var coffeesPromise = $http.get("../SpringAngularTogether1/coffees").success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject("");
			});
			return deferred.promise;
		};
		return {
			gatherCoffees: gatherCoffees
		};
	}])
})();