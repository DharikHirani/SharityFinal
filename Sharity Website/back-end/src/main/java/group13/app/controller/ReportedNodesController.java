package group13.app.controller;

import group13.app.dto.ReportedNodesDTO;
import group13.app.model.Location;
import group13.app.model.NewsLetter;
import group13.app.model.Organiser;
import group13.app.model.ReportedNodes;
import group13.app.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import group13.app.repository.ReportedNodesRepository;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Spliterator;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Controller
public class ReportedNodesController {
    @Autowired
   private  ReportedNodesRepository repo;
    @Autowired
    private  LocationRepository LocationRepo;
    
    
    
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "/reportednodes")
	public ResponseEntity<List<ReportedNodesDTO>> getAllReportedNodes() {
		List<ReportedNodes> allReportedNodes =  (List<ReportedNodes>) repo.findAll();
		System.out.println(allReportedNodes);
		return ResponseEntity.ok(allReportedNodes.stream().map(ReportedNodesDTO::new).collect(Collectors.toList()));
	} 
    

  @CrossOrigin(origins = "http://localhost:3000")
  @PostMapping(path = "/reportNode")
  public ResponseEntity<HttpStatus> addReportedNode (HttpServletRequest request) {


      int id = Integer.parseInt(request.getParameter("locationId"));
      Optional<Location> locationOpt = LocationRepo.findById(id);

      if (locationOpt.isPresent()) {
          ReportedNodes newReport= new ReportedNodes();
          newReport.setReportMessage(request.getParameter("reportMessage"));
          newReport.setLocation(locationOpt.get());
          repo.save(newReport);
          System.out.println("Report message added");
          return ResponseEntity.ok(HttpStatus.OK);
      }
      else {
          System.out.println("error Report message wasn't added");
          return ResponseEntity.ok(HttpStatus.NOT_FOUND);

      }




    }
}
