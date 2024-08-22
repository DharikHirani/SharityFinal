package group13.app.dto;

import group13.app.model.Location;
import group13.app.model.Member;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class LocationDTO {
    private int id;
    private String name;
    private float latitude;
    private float longitude;
    private String eventType;
    private String address;
	private String description;

	private List<Long> userIds;
    private UserDTO organiser;

    public LocationDTO(Location location) {
        id = location.getId();
        name = location.getName();
        latitude = location.getLatitude();
        longitude = location.getLongitude();
        eventType = location.getEventType();
        address = location.getAddress();
        description = location.getDescription();
        userIds = location.getUsers().stream().map(Member::getId).collect(Collectors.toList());
        organiser = new UserDTO(location.getOrganiser());
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public float getLatitude() {
        return latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public String getEventType() {
        return eventType;
    }
    
    public String getAddress() {
		return address;
	}
    
    public String getDescription() {
		return description;
	}

    public List<Long> getUserIds() {
        return userIds;
    }

    public UserDTO getOrganiser() {
        return organiser;
    }
}
