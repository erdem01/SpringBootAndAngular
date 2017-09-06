package erdemc.coffeeshop.services.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SpringAngularTogether1WebConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
		.userDetailsService(userDetailsService)
		.passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http
		 .csrf().disable()
         .exceptionHandling()
         .authenticationEntryPoint(authEntryPoint())
         .and()
         .authorizeRequests()
         .antMatchers("/**")
         .hasRole("USER")
         .and()
         .formLogin()
         .usernameParameter("username")
         .passwordParameter("password")
         .successHandler(authenticationSuccessHandler())
         .failureHandler(new SimpleUrlAuthenticationFailureHandler())
         .and()
         .logout()
         .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
	}
	
	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationEntryPoint authEntryPoint() {
		return new RestAuthenticationEntryPoint();
	}
	
	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new MySavedRequestAwareAuthenticationSuccessHandler();
	}
	
}
