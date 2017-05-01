describe('CoffeeService module test', function() {
	var $httpBackend, CoffeeService;
	var arrangeResult;
	beforeEach(module('CoffeeModule'));
	beforeEach(inject(function(_$httpBackend_, _CoffeeService_) {
		$httpBackend = _$httpBackend_;
		CoffeeService = _CoffeeService_;
		expected = [{id: 1, name: 'Mocha', price: 28}];
		arrangeResult = function(respCode, resultObj) {
			$httpBackend.expectGET("/coffeeShopServ/coffees").respond(respCode, resultObj);
		};
	}));
	it('should execute gatherCoffees successfully', function() {
		var expected = [{id: 1, name: 'Mocha', price: 28}];
		arrangeResult(200, expected);
		var result;
		CoffeeService.gatherCoffees().then(function(response) {
			result = response;
		}).catch(function(response) {
			fail("Service returned with an error! Status: " + response.status);
		});
		$httpBackend.flush();
		expect(result.data).toEqual(expected);
	});
	it('should fail during execution of gatherCoffees', function() {
		var expected = "expectedResult";
		arrangeResult(500, expected);
		var result;
		CoffeeService.gatherCoffees().then(function(response) {
			fail("Service returned with an error! Status: " + response.status);
		}).catch(function(response) {
			result = response;
		});
		$httpBackend.flush();
		expect(result.data).toEqual(expected);
	});
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})
});