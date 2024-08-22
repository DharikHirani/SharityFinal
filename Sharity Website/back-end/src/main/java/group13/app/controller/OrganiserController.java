package group13.app.controller;

import javax.servlet.http.HttpServletRequest;

import group13.app.dto.LocationDTO;
import group13.app.dto.UserDTO;
import group13.app.model.Member;
import group13.app.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

//import group13.app.model.Event;

import group13.app.model.Organiser;
import group13.app.repository.OrganiserRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class OrganiserController {
	@Autowired
	private OrganiserRepository orgRepo;

	@Autowired
	private LocationRepository locationRepo;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/organiser/{id}/locations")
	public ResponseEntity<Set<LocationDTO>> getLocations(@PathVariable("id") long id) {
		Optional<Organiser> organiserOpt = orgRepo.findById(id);

		if (organiserOpt.isPresent()) {
			Organiser organiser = organiserOpt.get();
			Set<LocationDTO> locations = locationRepo.findAllByOrganiser(organiser).stream().map(LocationDTO::new).collect(Collectors.toSet());
			return ResponseEntity.ok(locations);
//			return user.getSavedLocations().stream().map(LocationDTO::new).collect(Collectors.toSet());
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/organiser/{id}")
	public ResponseEntity<UserDTO> getOrganiser(@PathVariable("id") long id)
	{
		Optional<Organiser> organiserOpt = orgRepo.findById(id);

		if (organiserOpt.isPresent()) {
			return ResponseEntity.ok(new UserDTO(organiserOpt.get()));
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value = "/organiser/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") int id) {
		Optional<Organiser> organiser = orgRepo.findById((long) id);
		if (organiser.isPresent()) { 
			orgRepo.delete(organiser.get());
			return ResponseEntity.ok(HttpStatus.OK);
		} else {
			throw new RuntimeException("Organiser " + id + " could not be found");
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "/organisersignup")
	public ResponseEntity<HttpStatus> signUp(HttpServletRequest request) {
		Organiser newUser = new Organiser();
		newUser.setRole("organiser");
		newUser.setApproved(false);
		newUser.setName(request.getParameter("orgname"));
		newUser.setEmail(request.getParameter("orgemail"));
		newUser.setAddress(request.getParameter("orgaddress"));
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(request.getParameter("orgpassword"));
		newUser.setPassword(encodedPassword);
		orgRepo.save(newUser);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "/organisersignin")
	public ResponseEntity<Organiser> signIn(HttpServletRequest request) {

		try {
			orgRepo.findByEmail(request.getParameter("orgemail")).getEmail();
		} catch (Exception e) {

			System.out.println("Organiser Email Doesnt Exist");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 500
		}

		Organiser organiser = orgRepo.findByEmail(request.getParameter("orgemail"));
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		if ((organiser.getEmail().equals(request.getParameter("orgemail")))
				&& (encoder.matches(request.getParameter("orgpassword"), organiser.getPassword()))
				&& (organiser.isApproved() == true)) {
			System.out.println("" + request.getParameter("orgemail") + " " + request.getParameter("orgpassword")
					+ " Accepted, and approved");
			return ResponseEntity.ok(organiser); // 200
		} else if ((organiser.getEmail().equals(request.getParameter("orgemail")))
				&& (encoder.matches(request.getParameter("orgpassword"), organiser.getPassword()))
				&& (organiser.isApproved() == false)) {
			System.out.println("" + request.getParameter("orgemail") + " " + request.getParameter("orgpassword")
					+ " Accepted, but NOT approved");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} else if ((organiser.getEmail().equals(request.getParameter("orgemail")))
				&& (!organiser.getPassword().equals(request.getParameter("orgpassword")))) {
			System.out.println("" + request.getParameter("orgemail") + " " + request.getParameter("orgpassword")
					+ " Incorrect Password");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400
		} else {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value = "/organiser")
	public ResponseEntity<HttpStatus> updateUser(HttpServletRequest request) {

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Organiser> organiserOpt = orgRepo.findById(Long.parseLong(request.getParameter("id")));
		System.out.println("A request was made  Password:" + request.getParameter("password") + " IsOrganiserReal?" + organiserOpt.isPresent());

		if (organiserOpt.isPresent()) {
			Organiser organiser = organiserOpt.get();
			organiser.setName(request.getParameter("name"));
			organiser.setEmail(request.getParameter("email"));
			organiser.setAddress(request.getParameter("address"));
			organiser.setContactEmail(request.getParameter("contactEmail"));
			organiser.setContactWebsite(request.getParameter("contactWebsite"));

			try {
				if (!(encoder.matches(request.getParameter("password"), organiser.getPassword()))) {
					System.out.println("Password updated");
					BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
					String encodedPassword = passwordEncoder.encode(request.getParameter("password"));
					organiser.setPassword(encodedPassword);
				}
			} catch (Exception e) {
					System.out.println("password wasn't updated");
				try {
					organiser.setDescription(request.getParameter("description"));
					System.out.println(request.getParameter("description"));

				} catch (Exception f) {
					System.out.println("Discription wasn't updated");
				}
			}

			organiser.setRole(request.getParameter("role"));
			System.out.println(organiser.getEmail() + " " + organiser.getName() + " " + organiser.getAddress() + " "
					+ organiser.getPassword() + " " + organiser.getId());
			orgRepo.save(organiser);
		}
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value = "/organiser")
	public ResponseEntity<HttpStatus> deleteUser(HttpServletRequest request) {

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Organiser> organiserOpt = orgRepo.findById(Long.parseLong(request.getParameter("id")));
		if (organiserOpt.isPresent()) {
			Organiser organiser = organiserOpt.get();
			System.out.println("org present");
			if (encoder.matches(request.getParameter("password"), organiser.getPassword())) {
				orgRepo.deleteById(Long.parseLong(request.getParameter("id")));
				System.out.println("Organiser Deleted");
				return ResponseEntity.status(HttpStatus.OK).body(null); // 200
			} else {
				System.out.println("Organiser password error");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);// 404
		}

	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "/organisers/not-approved")
	public ResponseEntity<List<UserDTO>> getNotApproved() {
//		List<Organiser> organisers = orgRepo.findAllNotApproved();
		return ResponseEntity.ok(orgRepo.findAllPending().stream().map(UserDTO::new).collect(Collectors.toList()));
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "/organisers/approved")
	public ResponseEntity<List<Organiser>> getApproved() {
		List<Organiser> organisers = orgRepo.findAll();
		return ResponseEntity.ok(organisers);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "/organisers/with-locations")
	public ResponseEntity<List<UserDTO>> getWithLocations() {
		List<UserDTO> organisers = orgRepo.findAll().stream().map(UserDTO::new).filter(o -> o.getLocationsCount() > 0).collect(Collectors.toList());
		return ResponseEntity.ok(organisers);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "/organiser/approve")
	public ResponseEntity<HttpStatus> authoriseOrganiser(HttpServletRequest request) {
		String action = request.getParameter("action");
		long orgId = Long.parseLong(request.getParameter("orgId"));
		Optional<Organiser> organiserOpt = orgRepo.findById(orgId);

//		Server side session needs to be implemented first
//		if (...) {
//			System.out.println("Signed in user isn't admin.");
//			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
//		}

		if (organiserOpt.isEmpty()) {
			System.out.println("Organiser doesn't exist.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

		Organiser organiser = organiserOpt.get();

		if (action.equals("accept")) {
			organiser.setApproved(true);
			orgRepo.save(organiser);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} else if (action.equals("reject")) {
			organiser.setRejected(true);
			orgRepo.save(organiser);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	}

//		@GetMapping("/requests")
//		  public ResponseEntity<List<OrganiserRequest>> getAllRequests(@RequestParam(required = false) String orgname) {
//		    try {
//		      List<OrganiserRequest> requests = new ArrayList<OrganiserRequest>();
//
//		      if (orgname == null)
//		        organiserRepository.findAll().forEach(requests::add);
//		      else
//		        organiserRepository.findByOrgnameContaining(orgname).forEach(requests::add);
//
//		      if (requests.isEmpty()) {
//		        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		      }
//
//		      return new ResponseEntity<>(requests, HttpStatus.OK);
//		    } catch (Exception e) {
//		      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		    }
//		  }
//
//		  @GetMapping("/requests/{id}")
//		  public ResponseEntity<OrganiserRequest> getRequestById(@PathVariable("id") long id) {
//		    Optional<OrganiserRequest> requestData = organiserRepository.findById(id);
//
//		    if (requestData.isPresent()) {
//		      return new ResponseEntity<>(requestData.get(), HttpStatus.OK);
//		    } else {
//		      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		    }
//		  }
//		  
//
//
//		  @PutMapping("/requests/{id}")
//		  public ResponseEntity<OrganiserRequest> updateRequest(@PathVariable("id") long id, @RequestBody OrganiserRequest request) {
//		    Optional<OrganiserRequest> requestData = organiserRepository.findById(id);
//
//		    if (requestData.isPresent()) {
//		      OrganiserRequest _request = requestData.get();
//		      _request.setOrgname(request.getOrgname());
//		      _request.setOrgemail(request.getOrgemail());
//		      _request.setOrgpassword(request.getOrgaddress());
//		      _request.setOrgpassword(request.getOrgpassword());
//		      _request.setPublished(request.isPublished());
//		      return new ResponseEntity<>(organiserRepository.save(_request), HttpStatus.OK);
//		    } else {
//		      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		    }
//		  }
//
//		  @DeleteMapping("/requests/{id}")
//		  public ResponseEntity<HttpStatus> deleteRequest(@PathVariable("id") long id) {
//		    try {
//		      organiserRepository.deleteById(id);
//		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		    } catch (Exception e) {
//		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		    }
//		  }
//
//		  @DeleteMapping("/requests")
//		  public ResponseEntity<HttpStatus> deleteAllRequests() {
//		    try {
//		      organiserRepository.deleteAll();
//		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		    } catch (Exception e) {
//		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		    }
//		  }
//
//		  @GetMapping("/requests/published")
//		  public ResponseEntity<List<OrganiserRequest>> findByPublished() {
//		    try {
//		      List<OrganiserRequest> requests = organiserRepository.findByPublished(true);
//
//		      if (requests.isEmpty()) {
//		        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		      }
//		      return new ResponseEntity<>(requests, HttpStatus.OK);
//		    } catch (Exception e) {
//		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		    }
//		  }

}
