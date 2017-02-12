(function() {
	var module = angular.module('OrderPageModule', ['CoffeeModule']);
	module.controller('OrderPageController', ['$log', 'CoffeeService', function($log, CoffeeService) {
		var self = this;
		self.coffees = [];
		self.getCoffees = function() {
			return self.coffees;
		};
		var refreshCoffees = function() {
			var coffeePromise = CoffeeService.gatherCoffees();
			coffeePromise.then(function(response) {
				self.coffees = response;
				$log.log(response);
			}, function(errorMessage) {
				$log.log(errorMessage);
			});
		};
		refreshCoffees();
	}]);
})();