
package group13.app.model;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.search.annotations.Field;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@XmlRootElement
@Entity
@Table (name = "events")
public class Event implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	 
	@Column(name = "title", columnDefinition = "Text", length = 50)
	private String title;
	
	@Column(name = "description", columnDefinition = "Text", length = 500)
	private String description;
	
	@NotEmpty(message = "Field cannot be empty!")
	@Column(name = "date")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private String date;
	
	@Column(name = "startTime", nullable = true)
//	@Future(message = "Date must not be in the past!")
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	private String startTime;
	
	@Column(name = "endTime", nullable = true)
//	@Future(message = "Date must not be in the past!")
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	private String endTime;
	
	@Column(name = "attendance")
	private int attendance;
	
	
	@JsonIgnore
	@ManyToOne(targetEntity = Location.class,cascade= {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.EAGER)
	private Location location;

	public Event (String title, String description, String date, String startTime, String endTime, Location location) {
		this.title = title;
		this.description = description;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.location = location; 
		
	}





	public Event() {

	}

	
	
	public int getAttendance() {
		return attendance;
	}


	public void setAttendance(int attendance) {
		this.attendance = attendance;
	}
	
	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDate() {
		return this.date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStartTime() {
		return this.startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return this.endTime;
	}

	public void setEndTime (String endTime) {
		this.endTime = endTime;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String value) {
		this.description = value;
	}
	
	public void setLocation(Location location) {
		this.location = location;
	}
	public Location getLocation() {
		return location; 
	}


	
}
