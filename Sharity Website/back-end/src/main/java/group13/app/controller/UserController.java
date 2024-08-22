package group13.app.controller;
import group13.app.dto.UserDTO;
import group13.app.model.Admin;
import group13.app.model.Event;
import group13.app.model.Member;
import group13.app.model.NewsLetter;
import group13.app.model.Organiser;
import group13.app.repository.AdminRepository;
import group13.app.repository.EventRepository;
import group13.app.repository.MemberRepository;
import group13.app.repository.OrganiserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;

import group13.app.dto.EventDTO;
import group13.app.dto.LocationDTO;
import group13.app.model.Location;
import group13.app.repository.LocationRepository;
import group13.app.model.NewsLetter;
import group13.app.repository.NewsLetterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private OrganiserRepository orgRepo;

    @Autowired
    private MemberRepository memberRepo;

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    LocationRepository locationRepo;
    
    @Autowired
    NewsLetterRepository newsletterRepo;
    
    @Autowired
    EventRepository eventRepo; 

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/user/sign-in")
    public ResponseEntity<UserDTO> signIn(HttpServletRequest request) {
        Member member = memberRepo.findByEmail(request.getParameter("email"));
        Organiser organiser = orgRepo.findByEmail(request.getParameter("email"));
        Admin admin = adminRepo.findByEmail(request.getParameter("email"));

        if (member == null && organiser == null && admin == null) {
            System.out.println("User Email Doesnt Exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 500
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (member != null) {
            if ((member.getEmail().equals(request.getParameter("email")))
                    && (encoder.matches(request.getParameter("password"), member.getPassword()))) {
                System.out.println(
                        "" + request.getParameter("email") + " " + request.getParameter("password") + " Accepted");
                return ResponseEntity.ok(new UserDTO(member)); // 200
            } else if ((member.getEmail().equals(request.getParameter("email")))
                    && (!member.getPassword().equals(request.getParameter("password")))) {
                System.out.println("" + request.getParameter("email") + " " + request.getParameter("password")
                        + " Incorrect Password");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else if (organiser != null) {
            if ((organiser.getEmail().equals(request.getParameter("email"))) && (encoder.matches(request.getParameter("password"), organiser.getPassword())) && (organiser.isApproved())) {
                System.out.println("" + request.getParameter("email") + " " + request.getParameter("password") + " Accepted, and approved");
                return ResponseEntity.ok(new UserDTO(organiser)); //200
            } else if ((organiser.getEmail().equals(request.getParameter("email"))) && (encoder.matches(request.getParameter("password"), organiser.getPassword())) && (!organiser.isApproved())) {
                System.out.println("" + request.getParameter("email") + " " + request.getParameter("password") + " Accepted, but NOT approved");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            } else if ((organiser.getEmail().equals(request.getParameter("email"))) && (!organiser.getPassword().equals(request.getParameter("password")))) {
                System.out.println("" + request.getParameter("email") + " " + request.getParameter("password") + " Incorrect Password");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); //400
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else {
            if (encoder.matches(request.getParameter("password"), admin.getPassword())) {
                System.out.println("Admin password correct");
                return ResponseEntity.ok(new UserDTO(admin));
            } else {
                System.out.println("Admin password incorrect");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 401
            }
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/user/{id}/locations")
    public Set<LocationDTO> getLocations(@PathVariable("id") long id) {
        Optional<Member> userOpt = memberRepo.findById(id);

        if (userOpt.isPresent()) {
            Member user = userOpt.get();
            return user.getSavedLocations().stream().map(LocationDTO::new).collect(Collectors.toSet());
        }

        return null;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/user/location")
    public ResponseEntity<HttpStatus> saveLocation(HttpServletRequest request) {
        long userId = Long.parseLong(request.getParameter("userId"));
        int locationId = Integer.parseInt(request.getParameter("locationId"));

        Optional<Member> userOpt = memberRepo.findById(userId);
        Optional<Location> locationOpt = locationRepo.findById(locationId);

        if (userOpt.isPresent() && locationOpt.isPresent()) {
            Member user = userOpt.get();
            Location location = locationOpt.get();

            user.addLocation(location);
            memberRepo.save(user);

            return ResponseEntity.ok(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/user/location")
    public ResponseEntity<HttpStatus> removeLocation(HttpServletRequest request) {
        long userId = Long.parseLong(request.getParameter("userId"));
        int locationId = Integer.parseInt(request.getParameter("locationId"));

        Optional<Member> userOpt = memberRepo.findById(userId);
        Optional<Location> locationOpt = locationRepo.findById(locationId);

        if (userOpt.isPresent() && locationOpt.isPresent()) {
            Member user = userOpt.get();
            Location location = locationOpt.get();

            user.removeLocation(location);
            memberRepo.save(user);

            return ResponseEntity.ok(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/user/{id}/events")
    public Set<EventDTO> getEvents(@PathVariable("id") long id) {
        Optional<Member> userOpt = memberRepo.findById(id);

        if (userOpt.isPresent()) {
            Member user = userOpt.get();
            return user.getSavedEvents().stream().map(EventDTO::new).collect(Collectors.toSet());
        }

        return null;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/user/events")
    public ResponseEntity<HttpStatus> saveEvent(HttpServletRequest request) {
        long userId = Long.parseLong(request.getParameter("userId"));
        int eventId = Integer.parseInt(request.getParameter("eventId"));

        Optional<Member> userOpt = memberRepo.findById(userId);
        Optional<Event> eventOpt = eventRepo.findById((long) eventId);

        if (userOpt.isPresent() && eventOpt.isPresent()) {
            Member user = userOpt.get();
            Event event = eventOpt.get();
            
            event.setAttendance(event.getAttendance()+1);
            
            user.saveEvent(event);
            memberRepo.save(user);

            return ResponseEntity.ok(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/user/events")
    public ResponseEntity<HttpStatus> removeEvent(HttpServletRequest request) {
        long userId = Long.parseLong(request.getParameter("userId"));
        int eventId = Integer.parseInt(request.getParameter("eventId"));

        Optional<Member> userOpt = memberRepo.findById(userId);
        Optional<Event> eventOpt = eventRepo.findById((long) eventId);

        if (userOpt.isPresent() && eventOpt.isPresent()) {
            Member user = userOpt.get();
            Event event = eventOpt.get();

            event.setAttendance(event.getAttendance()-1);

            user.removeEvent(event);
            memberRepo.save(user);

            return ResponseEntity.ok(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/user/newsletter")
    public ResponseEntity<HttpStatus> saveNewsletter(HttpServletRequest request) {
        long userId = Long.parseLong(request.getParameter("userId"));
        int organiserId = Integer.parseInt(request.getParameter("organiserId"));

        Optional<Member> userOpt = memberRepo.findById(userId);
        Optional<Organiser> newsletterOpt = orgRepo.findById((long) organiserId);

        if (userOpt.isPresent() && newsletterOpt.isPresent()) {
            Member user = userOpt.get();
            Organiser newsletter = newsletterOpt.get();

            user.addNewsletter(newsletter);
            memberRepo.save(user);

            return ResponseEntity.ok(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/user/newsletter")
    public ResponseEntity<HttpStatus> removeNewsletter(HttpServletRequest request) {
        long userId = Long.parseLong(request.getParameter("userId"));
        int organiserId = Integer.parseInt(request.getParameter("organiserId"));

        Optional<Member> userOpt = memberRepo.findById(userId);
        Optional<Organiser> newsletterOpt = orgRepo.findById((long) organiserId);

        if (userOpt.isPresent() && newsletterOpt.isPresent()) {
            Member user = userOpt.get();
            Organiser newsletter = newsletterOpt.get();

            user.removeNewsletter(newsletter);
            memberRepo.save(user);

            return ResponseEntity.ok(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    
    
    @CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/organisers")
	public List<UserDTO> getAllOrganiser()
	{
		List<Organiser> allUsers = (List<Organiser>) orgRepo.findAll();

		return allUsers.stream().map(UserDTO::new).collect(Collectors.toList());
		
	}
    
    @CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/members")
	public List<UserDTO> getAllMembers()
	{
		List<Member> allMembers = (List<Member>) memberRepo.findAll();

		return allMembers.stream().map(UserDTO::new).collect(Collectors.toList());
		
	}
    
}
