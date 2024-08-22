package group13.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import group13.app.repository.ReportedNodesRepository;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
public class Location implements Serializable {
	private static final long serialVersionUID = 1L;


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;


	@JsonIgnore
	@ManyToMany(targetEntity = Member.class, mappedBy = "savedLocations", fetch = FetchType.EAGER)
	private Set<Member> users;

	@OneToMany(targetEntity = ReportedNodes.class, mappedBy = "location", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<ReportedNodes> Reports;

	@ManyToOne(targetEntity = Organiser.class, fetch = FetchType.LAZY, optional = false)
	private Organiser organiser;
	
	@OneToMany(targetEntity = Event.class, mappedBy = "location", cascade= {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.EAGER)
	private Set<Event> events;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "url")
	private String URL;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "latitude")
	private float latitude;

	@Column(name = "longitude")
	private float longitude;
	
	@Column(name = "district")
	private String district;
	
	@Column(name = "postcode")
	private String postcode;
	
	@Column(name = "telephone")
	private String telephone;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "shoppingListUrl")
	private String shoppingListUrl; 
	
	@Column(name = "country")
	private String country;
	
	@Column(name = "eventType")
	private String eventType;
	
	@Column(name = "description", nullable = true, length = 500)
	private String description;
	
	public Location(String name, float latitude, float longitude, String eventType, String address, String description, Organiser organiser) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.eventType = eventType;
		this.address = address;
		this.description = description;
		this.organiser = organiser;

	}

	public Location() {}

	public Organiser getOrganiser() {
		return organiser;
	}
	
	public Set<Event> getEvents() {
		return events;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public float getLatitude() { return latitude; }
	public void setLatitude(float latitude) { this.latitude = latitude; }

	public float getLongitude() { return longitude; }
	public void setLongitude(float longitude) { this.longitude = longitude; }

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	
	public String getPostcode() {
		return postcode;
	}
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	public String getURL() {
		return URL;
	}
	public void setURL(String URL) {
		this.URL = URL;		
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getShoppingListUrl() {
		return shoppingListUrl;
	}

	public void setShoppingListUrl(String shoppingListUrl) {
		this.shoppingListUrl = shoppingListUrl;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Member> getUsers() { return users; }
}
