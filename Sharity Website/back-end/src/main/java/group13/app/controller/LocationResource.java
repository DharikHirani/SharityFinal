package group13.app.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import group13.app.dto.LocationDTO;
import group13.app.model.Organiser;
import group13.app.repository.OrganiserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import group13.app.model.Location;
import group13.app.repository.LocationRepository;

import javax.servlet.http.HttpServletRequest;


@RestController
public class LocationResource {
		@Autowired
		LocationRepository repo;

		@Autowired
		OrganiserRepository orgRepo;

		@CrossOrigin(origins = "http://localhost:3000")
		@GetMapping(path="/locations")
		public List<LocationDTO> getAllLocations()
		{
			List<Location> allLocations = (List<Location>) repo.findAll();
			return allLocations.stream().map(LocationDTO::new).collect(Collectors.toList());
		}

		@CrossOrigin(origins = "http://localhost:3000")
		@GetMapping("/locations/bounds/s/{s}/w/{w}/n/{n}/e/{e}")
		public List<LocationDTO> getLocationsInBounds(@PathVariable("s") float s, @PathVariable("w") float w, @PathVariable("n") float n, @PathVariable("e") float e)
		{
			return repo.findLocationsInBounds(s, w, n, e).stream().map(LocationDTO::new).collect(Collectors.toList());
		}

		@CrossOrigin(origins = "http://localhost:3000")
		@GetMapping("/location/{id}")
		public Optional<LocationDTO> getLocation(@PathVariable("id") int id)
		{
			return repo.findById(id).map(LocationDTO::new);
		}
		
		@CrossOrigin(origins = "http://localhost:3000")
		@PutMapping("/location/edit/{id}")
		public ResponseEntity<LocationDTO> editLocation(@PathVariable("id") int id, @ModelAttribute Location request)
		{
			Optional<Location> editData = repo.findById(id);
			 if (editData.isPresent()) {
			      Location _edit = editData.get();
			      _edit.setName(request.getName());
			      _edit.setDescription(request.getDescription());
			      repo.save(_edit);
			      return new ResponseEntity<>(new LocationDTO(_edit), HttpStatus.OK);
			    } else {
			      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			    }
		}

		@CrossOrigin(origins = "http://localhost:3000")
		@PostMapping(path="/location") 
		public ResponseEntity<HttpStatus> addLocation(HttpServletRequest request)
		{
			String name = request.getParameter("name");
			float latitude = Float.parseFloat(request.getParameter("latitude"));
			float longitude = Float.parseFloat(request.getParameter("longitude"));
			String type = request.getParameter("type");
			String address = request.getParameter("address");
			String description = request.getParameter("description");
      
			long organiserId = Long.parseLong(request.getParameter("organiserId"));
			Optional<Organiser> organiserOpt = orgRepo.findById(organiserId);

			if (organiserOpt.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			Location newLocation = new Location(name, latitude, longitude, type, address, description, organiserOpt.get());
			repo.save(newLocation);

			return ResponseEntity.ok(HttpStatus.OK);
		}
		
		@CrossOrigin(origins = "http://localhost:3000")
		@DeleteMapping(path="/location/{id}")
		public String deleteLocation(@PathVariable("id") int id)
		{
			Optional<Location> loc = repo.findById(id);
			
			if (loc.isPresent()) {
				repo.delete(loc.get());
				return "Location deleted";
			} else {
				throw new RuntimeException("Location " + id + " could not be found");
			}
		}
		
		@PutMapping("/location")
		public Location update (@RequestBody Location locationObj)
		{
			return repo.save(locationObj);
		}
}
