package erdemc.coffeeshop.services.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity(name=Role.TABLE_NAME)
@Table(name=Role.TABLE_NAME)
public class Role {

	static final String TABLE_NAME = "ROLES";
	
	static final String ID_COL_NAME = "ROLE_ID";
	
	private static final String ROLE_NAME_COL_NAME = "ROLE_NAME";
	
	@Id
    @Column(name=ID_COL_NAME)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name=ROLE_NAME_COL_NAME)
	private String roleName;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
