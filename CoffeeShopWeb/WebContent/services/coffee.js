(function() {
	var module = angular.module('CoffeeModule', []);
	module.factory('CoffeeService', ['$http', '$q', function($http, $q) {
		var gatherCoffees = function() {
			var deferred = $q.defer();
			var coffeesPromise = $http.get("/coffeeShopServ/coffees").then(function(response) {
				deferred.resolve(response);
			}).catch(function(response) {
				deferred.reject("");
			});
			return deferred.promise;
		};
		return {
			gatherCoffees: gatherCoffees
		};
	}])
})();