package erdemc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erdemc.dao.CoffeeDAO;
import erdemc.model.Coffee;

@Controller
public class CoffeeController {

	@Autowired
	private CoffeeDAO coffeeDAO;
	
	@RequestMapping(value = "/coffees", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<Coffee> findUsers() {
		return coffeeDAO.findAll();
	}
	
}
