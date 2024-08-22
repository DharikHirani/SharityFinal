package group13.app.dto;

import java.util.List;
import java.util.stream.Collectors;

import group13.app.model.Admin;
import group13.app.model.Member;
import group13.app.model.Organiser;
import lombok.Data;

@Data
public class UserDTO {

	long id;
	String email;
	String firstName;
	String lastName;
	String name;
	String role;
	String address;
	String description;
	String contactEmail;
	String contactWebsite;
	boolean approved = true;
	int locationsCount;
	int subscriberCount;
	private List<Long> organiserIds;
	private List<Long> subscriberIds;

	public UserDTO(Member member) {
		id = member.getId();
		email = member.getEmail();
		firstName = member.getFirstName();
		lastName = member.getLastName();
		role = member.getRole();
		organiserIds = member.getSubscribedNewsletters().stream().map(Organiser::getId).collect(Collectors.toList());
	}

	public UserDTO(Organiser organiser) {
		id = organiser.getId();
		email = organiser.getEmail();
		name = organiser.getName();
		address = organiser.getAddress();
		description = organiser.getDescription();
		contactEmail = organiser.getContactEmail();
		contactWebsite = organiser.getContactWebsite();
		role = organiser.getRole();
		approved = organiser.isApproved();
		locationsCount = organiser.getLocations().size();
		subscriberCount = organiser.getSubscribers().size();
		subscriberIds = organiser.getSubscribers().stream().map(Member::getId).collect(Collectors.toList());
	}

	public UserDTO(Admin admin) {
		id = admin.getId();
		email = admin.getEmail();
		role = admin.getRole();
	}

	public long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getName() {
		return name;
	}

	public String getRole() {
		return role;
	}

	public String getAddress() {
		return address;
	}

	public String getDescription() {
		return description;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public String getContactWebsite() {
		return contactWebsite;
	}

	public boolean isApproved() {
		return approved;
	}

	public int getLocationsCount() {
		return locationsCount;
	}

	public int getSubscriberCount() {
		return subscriberCount;
	}

	public List<Long> getOrganiserIds() {
		return organiserIds;
	}
	
	public List<Long> getSubscriberIds() {
		return subscriberIds;
	}
}
