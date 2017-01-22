package erdemc.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import erdemc.dao.UserDAO;
import erdemc.model.Role;
import erdemc.model.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=DBUserDetailsServiceTest.class)
public class DBUserDetailsServiceTest {
	
	@Bean
	private UserDAO userDAO() {
		return mock(UserDAO.class);
	}
	
	@Bean
	private UserDetailsService userDetailsService() {
		return new DBUserDetailsService();
	}
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Test(expected=UsernameNotFoundException.class)
	@DirtiesContext
	public void testLoadUserByUsername_whenUserNotFound() {
		final String userCode = "userCode";
		doReturn(null).when(userDAO).findByUserCode(userCode);
		userDetailsService.loadUserByUsername(userCode);
	}
	
	@Test
	@DirtiesContext
	public void testLoadUserByUsername_whenUserExists() {
		//Given
		final String userCode = "userCode";
		final String hidden = "password";
		final Role role1 = new Role();
		role1.setRoleName("role1");
		final Role role2 = new Role();
		role2.setRoleName("role2");
		final List<Role> roles = new ArrayList<>();
		roles.add(role1);
		roles.add(role2);
		final User expectedUser = new User();
		expectedUser.setUserCode(userCode);
		expectedUser.setPassword(hidden);
		expectedUser.setRoles(roles);
		doReturn(expectedUser).when(userDAO).findByUserCode(userCode);
		//When
		final UserDetails actualUser = userDetailsService.loadUserByUsername(userCode);
		//Then
		assertEquals(expectedUser.getUserCode(), actualUser.getUsername());
		assertEquals(expectedUser.getPassword(), actualUser.getPassword());
		expectedUser.getRoles().forEach(role -> {
			for (GrantedAuthority auth : actualUser.getAuthorities()) {
				if(role.getRoleName().equals(auth.getAuthority())) {
					return;
				}
			}
			fail("No auth found for role " + role.getRoleName() + "!");
		});
	}

}
