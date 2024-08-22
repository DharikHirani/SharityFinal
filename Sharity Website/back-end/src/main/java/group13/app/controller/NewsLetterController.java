package group13.app.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import group13.app.model.Location;
import group13.app.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import group13.app.dto.LocationDTO;
import group13.app.dto.NewsletterDTO;
import group13.app.model.NewsLetter;
import group13.app.model.Organiser;
import group13.app.repository.NewsLetterRepository;
import group13.app.repository.OrganiserRepository;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter; 

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class NewsLetterController {

	@Autowired
	private NewsLetterRepository repo;
	@Autowired
	private OrganiserRepository orgRepo;

	@Autowired
	private JavaMailSender javaMailSender;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "/organiser/{id}/newsletters")
	public ResponseEntity<List<NewsletterDTO>> getAllNewsLetters(@PathVariable("id") long id) {
		List<NewsLetter> allNewsletters = repo.findByOrganiserId(id);
		return ResponseEntity.ok(allNewsletters.stream().map(NewsletterDTO::new).collect(Collectors.toList()));
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/newsletter/{id}")
	public Optional<NewsletterDTO> getNewsletter(@PathVariable("id") long id) {
		return repo.findById(id).map(NewsletterDTO::new);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/newsletters")
	public ResponseEntity<List<NewsletterDTO>> getAllNewsletters()
	{
		List<NewsLetter> allNewsletters = repo.findAll();
		return ResponseEntity.ok(allNewsletters.stream().map(NewsletterDTO::new).collect(Collectors.toList()));
	}


	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "/addNewsLetter")
	public ResponseEntity<HttpStatus> signUp(HttpServletRequest request) throws MessagingException {



		long id = Long.parseLong(request.getParameter("id"));
		Optional<Organiser> organiserOpt = orgRepo.findById(id);

		if (organiserOpt.isPresent()) {
			Organiser organiser = organiserOpt.get();

			String title = request.getParameter("title");
			String body = request.getParameter("body");

		    LocalDateTime dateAndTime = LocalDateTime.now();  
		    DateTimeFormatter date = DateTimeFormatter.ofPattern("dd/MM/yyyy");  
		    DateTimeFormatter time = DateTimeFormatter.ofPattern("HH:mm a");
		    String formattedDate = dateAndTime.format(date);  
		    String formattedTime = dateAndTime.format(time);  
		    
			NewsLetter newsLetter = new NewsLetter();
			newsLetter.setBody(body);
			newsLetter.setTitle(title);
			newsLetter.setOrganiser(organiser);
			newsLetter.setDateAndTimeAdded(formattedDate+" at "+formattedTime);
			repo.save(newsLetter);

			try {
				for (Member subscriber : organiser.getSubscribers()) {
					System.out.println(subscriber.getEmail());
					String subscriberEmail = subscriber.getEmail();
					sendEmailHTML(title, body, subscriberEmail);
				}
			} catch(MessagingException e) {
				System.out.println(e);
			}

			System.out.println("newsletter added");
			return ResponseEntity.ok(HttpStatus.OK);
		} else {
			System.out.println("error Newsletter wasn't added");
			return ResponseEntity.ok(HttpStatus.NOT_FOUND);
		}

	}

	void sendEmailHTML(String subject, String text, String to) throws MessagingException {
//		https://mkyong.com/java/javamail-api-sending-email-via-gmail-smtp-example/
		MimeMessage msg = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(msg, true);

		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(text, true);
		javaMailSender.send(msg);
	}
}
