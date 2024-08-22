package group13.app.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "members")
public class Member implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, unique = true, length = 45)
	private String email;
	
	@JsonIgnore
	@Column(nullable = false, length = 64)
	private String password;

	@Column(name = "first_name", nullable = false, length = 20)
	private String firstName;

	@Column(name = "last_name", nullable = false, length = 20)
	private String lastName;

	@Column(nullable = false)
	private String role;

	@ManyToMany(targetEntity = Location.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Location> savedLocations;
	
	@ManyToMany(targetEntity = Organiser.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Organiser> subscribedNewsletters;
	
	@ManyToMany(targetEntity = Event.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Event> savedEvents;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Set<Location> getSavedLocations() { return savedLocations; }
	
	public Set<Organiser> getSubscribedNewsletters() { return subscribedNewsletters; }
	
	public Set<Event> getSavedEvents() { return savedEvents; }

	public void addLocation(Location location) {
		this.savedLocations.add(location);
//		location.getUsers().add(this);
	}

	public void removeLocation(Location location) {
		this.savedLocations.remove(location);
//		location.getUsers().remove(this);
	}
	
	public void addNewsletter(Organiser newsletter) {
		this.subscribedNewsletters.add(newsletter);
//		location.getUsers().add(this);
	}

	public void removeNewsletter(Organiser newsletter) {
		this.subscribedNewsletters.remove(newsletter);
//		location.getUsers().remove(this);
	}
	
	public void saveEvent(Event event) {
		this.savedEvents.add(event);
	}
	
	public void removeEvent(Event event) {
		this.savedEvents.remove(event);
	}
}
