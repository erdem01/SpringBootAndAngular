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
		self.findOrder = function(coffee) {
			if(coffee === null) {
				return null;
			}
			for(var i=0; i<orders.length; i++) {
				var order = orders[i];
				if(order.coffee.id == coffee.id) {
					return order;
				}
			}
			return null;
		}
		self.findOrderCount = function(coffee) {
			var order = self.findOrder(coffee);
			return order === null ? 0 : order.count;
		}
		self.addOrder = function(coffee) {
			var order = self.findOrder(coffee);
			if(order === null) {
				order = {
					count: 1,
					coffee: coffee
				};
				orders.push(order);
			} else {
				order.count++;
			}
		}
		self.isCoffeeOrdered = function(coffee) {
			return self.findOrder(coffee) !== null;
		}
		self.removeOrder = function(coffee) {
			for(var i=0; i<orders.length; i++) {
				var order = orders[i];
				if(order.coffee.id == coffee.id) {
					if(order.count == 1) {
						orders.splice(i, 1);
					} else {
						order.count--;
					}
					return;
				}
			}
		}
		self.refreshOrders = function() {
			for(var i=0; i<orders.length; i++) {
				var order = orders[i];
				if(order.count <= 0) {
					orders.splice(i, 1);
				}
			}
		}
		self.getOrders = function() {
			return orders;
		}
		self.calculatePrice = function() {
			var total = 0;
			for(var i=0; i<orders.length; i++) {
				var order = orders[i];
				total += order.coffee.price * order.count;
			}
			return total;
		}
	}]);
})();