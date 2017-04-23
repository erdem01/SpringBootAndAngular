package erdemc.coffeeshop.services.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import erdemc.coffeeshop.services.dao.UserDAO;
import erdemc.coffeeshop.services.model.User;

@Controller
public class UserController {
	
	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<User> findUsers() {
		final List<User> users = userDAO.findAll();
		users.forEach(user -> user.getRoles().forEach(role -> System.out.println(role.getRoleName())));
		return users;
	}

}
