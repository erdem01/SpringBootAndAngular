(function() {
	var module = angular.module('OrderPageModule', ['CoffeeModule']);
	module.controller('OrderPageController', ['$log', 'CoffeeService', function($log, CoffeeService) {
		var self = this;
		var coffees = [];
		self.getCoffees = function() {
			return coffees;
		};
		var refreshCoffees = function() {
			var coffeePromise = CoffeeService.gatherCoffees();
			coffeePromise.then(function(response) {
				coffees = response;
				$log.log(response);
			}, function(errorMessage) {
				$log.log(errorMessage);
			});
		};
		refreshCoffees();
		var orders = [];
		self.addOrder = function(coffee) {
			for(var i=0; i<orders.length; i++) {
				var order = orders[i];
				if(order.coffee.id == coffee.id) {
					order.count++;
					return;
				}
			}
			var newOrder = {
				count: 1,
				coffee: coffee
			};
			orders.push(newOrder);
		}
		self.getOrders = function() {
			return orders;
		}
	}]);
})();