package erdemc.coffeeshop.services.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name=User.TABLE_NAME)
public class User {
	
	static final String TABLE_NAME = "USERS";
	
	private static final String ID_COL_NAME = "USER_ID";
	
	private static final String USER_CODE_COL_NAME = "USER_CODE";
	
	private static final String HIDDEN_COL_NAME = "PASSWORD";

	@Id
    @Column(name=ID_COL_NAME)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name=USER_CODE_COL_NAME)
	private String userCode;
	
	@Column(name=HIDDEN_COL_NAME)
	private String password;
	
	@ManyToMany
	@JoinTable(
	      name="USER_ROLE_REL",
	      joinColumns=@JoinColumn(name=ID_COL_NAME, referencedColumnName=ID_COL_NAME),
	      inverseJoinColumns=@JoinColumn(name=Role.ID_COL_NAME, referencedColumnName=Role.ID_COL_NAME))
	private List<Role> roles;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	
}