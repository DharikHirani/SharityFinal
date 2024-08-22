package group13.app.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnore;

@XmlRootElement
@Entity
@Table(name = "newsletters")
public class NewsLetter implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "title", columnDefinition = "Text")
	private String title;

	@Column(name = "dateAndTimeAdded")
	private String dateAndTimeAdded;

	@Column(name = "body", columnDefinition = "Text")
	private String body;

	@ManyToOne(targetEntity = Organiser.class, fetch = FetchType.LAZY, optional = false)
	private Organiser organiser;

	public void setOrganiser(Organiser organiser) {
		this.organiser = organiser;
	}

	public Organiser getOrganiser() {
		return organiser;
	}

	public long getId() {
		return id;
	}

	public void setId(int id) {
	}

	public String getBody() {
		return body;
	}

	public void setBody(String content) {
		this.body = content;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDateAndTimeAdded() {
		return dateAndTimeAdded;
	}

	public void setDateAndTimeAdded(String dateAndTimeAdded) {
		this.dateAndTimeAdded = dateAndTimeAdded;
	}

}
