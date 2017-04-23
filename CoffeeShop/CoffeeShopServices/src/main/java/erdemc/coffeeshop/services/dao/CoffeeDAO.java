package erdemc.coffeeshop.services.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import erdemc.coffeeshop.services.model.Coffee;

@Repository
public interface CoffeeDAO extends JpaRepository<Coffee, Long> {

}
