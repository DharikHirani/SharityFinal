package group13.app.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
@Table(name = "organisers")
public class Organiser implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	
	
	@OneToMany(targetEntity = NewsLetter.class, mappedBy = "organiser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<NewsLetter> newsletters;
	
	@JsonIgnore
	@ManyToMany(targetEntity = Member.class, mappedBy = "subscribedNewsletters", fetch = FetchType.EAGER)
	private Set<Member> subscribers;
	
	@Column(name = "email", nullable = false, unique = true, length = 45)
	private String email;
	     
	@Column(name = "password", nullable = false, length = 64)
	@JsonIgnore
	private String password;

	@Column(name = "name", nullable = false, length = 20)
	private String name;

	@Column(name = "address", nullable = false, length = 100)
	private String address;
	
	@Column(name = "description", nullable = true, length = 1000)
	private String description;
	
	@Column(name = "contactWebsite", nullable = true, length = 100)
	private String contactWebsite;
	
	@Column(name = "contactEmail", nullable = true, length = 45)
	private String contactEmail;	

	@Column(name = "approved")
	private boolean approved;

	@Column()
	private boolean rejected;
	
	@Column(nullable = false)
	private String role;


//    @OneToOne(mappedBy = "organiser", cascade = CascadeType.ALL)
//    @PrimaryKeyJoinColumn
//	private NewsLetter newsLetter;
//	

	@OneToMany(targetEntity = Location.class, mappedBy = "organiser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Location> locations;

	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContactWebsite() {
		return contactWebsite;
	}

	public void setContactWebsite(String contactWebsite) {
		this.contactWebsite = contactWebsite;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;

	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean isApproved) {
		this.approved = isApproved;
	}

	public boolean isRejected() {
		return rejected;
	}

	public void setRejected(boolean isRejected) {
		this.rejected = isRejected;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Set<Location> getLocations() {
		return locations;
	}
	
	public Set<Member> getSubscribers() {
		return subscribers;
	}
}