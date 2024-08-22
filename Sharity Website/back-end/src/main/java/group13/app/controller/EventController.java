package group13.app.controller;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import group13.app.DBRunner;
import group13.app.dto.EventDTO;
import group13.app.dto.NewsletterDTO;
import group13.app.dto.UserDTO;
import group13.app.model.Event;
import group13.app.model.Location;
import group13.app.model.Member;
import group13.app.model.NewsLetter;
import group13.app.model.Organiser;
import group13.app.repository.EventRepository;
import group13.app.repository.LocationRepository;


@RestController
public class EventController {
	
	@Autowired
	private EventRepository eventRepo;
	
	@Autowired
	private LocationRepository locationRepo;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "/events")
	public List<EventDTO> getEvents() {
		List<EventDTO> events = eventRepo.findAll().stream().map(EventDTO::new).collect(Collectors.toList());
		return events;
	}
	
//	@CrossOrigin(origins = "http://localhost:3000")
//	@GetMapping(path = "/location/{id}/events")
//	public ResponseEntity<List<Event>> getAllEvents(@PathVariable("id") int id) {
//		List<Event> allEvents = (List<Event>) eventRepo.findByLocationId(id);
//		return ResponseEntity.ok(allEvents);
//	}
	
//	@CrossOrigin(origins = "http://localhost:3000")
//	@RequestMapping("/events/{id}")
//	public ResponseEntity<Event> getEvent(@PathVariable("id") long id) {
//		Optional<Event> eventOpt = eventRepo.findById(id); 
//		if (eventOpt.isPresent()) {
//		return new ResponseEntity(eventOpt.get(), HttpStatus.OK);} else {
//			return new ResponseEntity(HttpStatus.NOT_FOUND);
//		}
//	}
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/events/{id}")
	public Optional<EventDTO> getEvent(@PathVariable("id") long id) {
	return eventRepo.findById(id).map(EventDTO::new);
	}
	
	  @CrossOrigin(origins = "http://localhost:3000")
	    @GetMapping(path="/location/{id}/events")
	    public Set<EventDTO> getEvents(@PathVariable("id") long id) {
	        Optional<Location> locationOpt = locationRepo.findById((int) id);

	        if (locationOpt.isPresent()) {
	            Location location = locationOpt.get();
	            return location.getEvents().stream().map(EventDTO::new).collect(Collectors.toSet());
	        }

	        return null;
	    }
	  
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path="/events/")
	public ResponseEntity<HttpStatus> addEvent(HttpServletRequest request) {

		SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm");
		
		int id = Integer.parseInt(request.getParameter("locationId"));
		Optional<Location> locationOpt = locationRepo.findById(id);

		if (locationOpt.isPresent()) {
		Event newEvent = new Event();
		Location location = locationOpt.get();
		newEvent.setLocation(location);
		newEvent.setTitle(request.getParameter("title")); 
		newEvent.setDescription(request.getParameter("description")); 
		newEvent.setDate(request.getParameter("date"));
		newEvent.setStartTime(request.getParameter("startTime"));
		newEvent.setEndTime(request.getParameter("endTime"));
		eventRepo.save(newEvent);
		 System.out.println("Event added");
		 return ResponseEntity.ok(HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

		
		
//		java.util.Date frmDate = sdfDate.parse(newEvent.setDate);

		
//		Date endTime = new Date(dateinMilliSecs);
//		String endTimeStr = new SimpleDateFormat("HH:mm").format(startTime);
//		endTimeStr = request.getParameter("endTime");

		
//		Event newEvent = new Event(title, description, date, startTime, endTime); 		
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping(path="/event/{id}")
	public String deleteEvent(@PathVariable("id") long id)
	{
		Optional<Event> event = eventRepo.findById(id);
		
		if (event.isPresent()) {
			eventRepo.delete(event.get());
			return "Event is deleted";
		} else {
			throw new RuntimeException("Event " + id + " could not be found");
		}
	}
	
	@PutMapping("/event")
	public ResponseEntity<HttpStatus> updateEvent (HttpServletRequest request) {
	
	Optional<Event> eventOpt = eventRepo.findById(Long.parseLong(request.getParameter("id")));
	
	{
		if (eventOpt.isPresent()) {
			Event event = eventOpt.get();
			event.setTitle(request.getParameter("title"));
			event.setDescription(request.getParameter("description"));
			event.setDate(request.getParameter("date"));
			event.setStartTime(request.getParameter("startTime"));
			event.setEndTime(request.getParameter("endTime"));
			
			System.out.println(event.getTitle() + " " + event.getDescription() + " " + event.getDate() + " "
			+ event.getStartTime() + " " + event.getEndTime() + " " + event.getId());
			eventRepo.save(event);	
		}
		return ResponseEntity.ok(HttpStatus.OK); 
		} 
	}
	
	
	
//	@CrossOrigin(origins = "http://localhost:3000")
//	@PostMapping(path = "/events/add")
//	public EventDTO addEvent (@PathVariable("add") String title, String description, @RequestParam Date date,
//			@RequestParam @DateTimeFormat (iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm") LocalTime startTime,
//			@RequestParam @DateTimeFormat (iso = DateTimeFormat.ISO.TIME, pattern = "HH:mm") LocalTime endTime)
//			throws IllegalArgumentException{
//		
//		Event event = new Event();
//		
//		
//		return null;
		
		//Event event = DBRunner.addEvent(title, description, date, Time.valueOf(startTime), Time.valueOf(endTime));

				//return convertToDTO(event);
		
//	}
}
