package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usertable")
@Getter
@Setter
public class UserDTO {
	@Column(name="name", nullable = false, length = 30)
	private String name;
	
	@Id
	@Column(name="id", length = 30)
	private String id;
	
	@Column(name="pwd", nullable = false, length = 30)
	private String pwd;
	
}