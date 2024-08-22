package group13.app.dto;

import group13.app.model.Member;
import group13.app.model.NewsLetter;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class NewsletterDTO {
	private int id;
	private String title;
	private String dateAndTimeAdded;
	private String body;
	private UserDTO organiser;

	public NewsletterDTO(NewsLetter newsletter) {
		id = (int) newsletter.getId();
		title = newsletter.getTitle();
		dateAndTimeAdded = newsletter.getDateAndTimeAdded();
		body = newsletter.getBody();
		organiser = new UserDTO(newsletter.getOrganiser());
	}

	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDateAndTimeAdded() {
		return dateAndTimeAdded;
	}

	public String getBody() {
		return body;
	}

	public UserDTO getOrganiser() {
		return organiser;
	}
}
