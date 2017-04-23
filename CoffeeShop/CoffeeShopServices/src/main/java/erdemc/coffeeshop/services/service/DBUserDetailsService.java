package erdemc.coffeeshop.services.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import erdemc.coffeeshop.services.dao.UserDAO;
import erdemc.coffeeshop.services.model.User;

@Service
public class DBUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDAO userDAO;
	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		final User user = userDAO.findByUserCode(username);
		if (user == null) {
			throw new UsernameNotFoundException("No user found for name " + username);
		}
		final String hidden = user.getPassword();
		final List<GrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRoleName())));
		return new org.springframework.security.core.userdetails.User(username, hidden, authorities);
	}

}
