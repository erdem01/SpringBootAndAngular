package erdemc.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import erdemc.model.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {

	User findByUserCodeAndPassword(String userCode, String password);
	
	User findByUserCode(String userCode);
	
}
