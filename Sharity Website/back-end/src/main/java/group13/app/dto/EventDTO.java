package group13.app.dto;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import group13.app.model.Event;
import group13.app.model.Location;
import lombok.Data;

@Data
public class EventDTO {

	private long id; 
	private String title;
	private String description;
	private String date;
	private String startTime;
	private String endTime;
	private int attendance;
	private LocationDTO location;

	
	private List<Long> userIds;
	
//	public EventDTO() {
//		
//	}
	
//	public EventDTO(String title, String description, String date, String startTime, String endTime) {
//		this.title = title;
//		this.description = description;
//		this.date = date; 
//		this.startTime = startTime;
//		this.endTime = endTime;
//	}
	
	public EventDTO (Event event) {
		id = event.getId();
		title = event.getTitle();
		date = event.getDate();
		startTime = event.getStartTime();
		endTime = event.getEndTime();
		description = event.getDescription();
		attendance = event.getAttendance();
		location = new LocationDTO(event.getLocation());
	}

	public int getAttendance() {
		return attendance;
	}


	public long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDate() {
		return date;
	}

	public String getStartTime() {
		return startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public String getDescription() {
		return description;
	}
	
	public List getUserIds() {
		return userIds;
	}

	public LocationDTO getLocation() {
		return location;
	}
}
