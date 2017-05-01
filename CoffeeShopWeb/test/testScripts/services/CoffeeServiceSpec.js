describe('CoffeeService module test', function() {
	var $httpBackend, CoffeeService;
	var expected;
	beforeEach(module('CoffeeModule'));
	beforeEach(inject(function(_$httpBackend_, _CoffeeService_) {
		expected = [{id: 1, name: 'Mocha', price: 28}];
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET("/coffeeShopServ/coffees").respond(expected);
		CoffeeService = _CoffeeService_;
	}));
	it('should call coffee service', function() {
		var result;
		CoffeeService.gatherCoffees().then(function(response) {
			result = response.data;
		}).catch(function(response) {
			result = response;
		});
		$httpBackend.flush();
		expect(result).toEqual(expected);
	});
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})
});