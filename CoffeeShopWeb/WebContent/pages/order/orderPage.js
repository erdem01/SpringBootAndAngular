(function() {
	var module = angular.module('OrderPageModule', ['CoffeeModule']);
	module.controller('OrderPageController', ['$log', 'CoffeeService', function($log, CoffeeService) {
		var self = this;
		var coffees = [];
		var orderables = [];
		var orders = [];
		self.getCoffees = function() {
			return coffees;
		};
		self.getOrderables = function() {
			return orderables;
		};
		self.getOrders = function() {
			return orders;
		};
		var generateOrderables = function(coffees) {
			var result = [];
			for(var i=0; i<coffees.length; i++) {
				var coffee = coffees[i];
				var order = {
					count: 0,
					coffee: coffee	
				};
				result.push(order);
			}
			return result;
		}
		var refreshCoffees = function() {
			var coffeePromise = CoffeeService.gatherCoffees();
			coffeePromise.then(function(response) {
				coffees = response;
				orderables = generateOrderables(coffees);
				$log.log(response);
			}, function(errorMessage) {
				$log.log(errorMessage);
			});
		};
		self.removeOrder = function(order) {
			if(order.count > 0) {
				order.count--;
			}
		}
		self.addOrder = function(order) {
			order.count++;
		}
		self.refreshOrders = function() {
			var newBill = [];
			for(var i=0; i<orderables.length; i++) {
				var order = orderables[i];
				if(order.count > 0) {
					newBill.push(order);
				}
			}
			orders = newBill;
		}
		self.calculatePrice = function() {
			var total = 0;
			for(var i=0; i<orders.length; i++) {
				var order = orders[i];
				total += order.coffee.price * order.count;
			}
			return total;
		}
		self.deleteOrder = function(order) {
			order.count = 0;
		}
		refreshCoffees();
	}]);
})();