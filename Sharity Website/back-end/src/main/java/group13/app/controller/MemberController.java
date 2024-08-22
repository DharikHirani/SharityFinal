package group13.app.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import group13.app.model.Location;
import group13.app.model.Member;
import group13.app.model.Organiser;
//import group13.app.model.User;
import group13.app.repository.MemberRepository;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class MemberController {
	@Autowired
	private MemberRepository repo;

	@GetMapping("")
	public String viewHomePage() {
		return "index";
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "/membersignup")
	public ResponseEntity<HttpStatus> signUp(HttpServletRequest request) {
		Member newUser = new Member();
		newUser.setFirstName(request.getParameter("firstname"));
		newUser.setLastName(request.getParameter("lastname"));
		newUser.setEmail(request.getParameter("email"));
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(request.getParameter("password"));
		newUser.setPassword(encodedPassword);
		newUser.setRole("member");
		repo.save(newUser);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "/membersignin")
	public ResponseEntity<Member> signIn(HttpServletRequest request) {

		try {
			repo.findByEmail(request.getParameter("email")).getEmail();
		} catch (Exception e) {
			System.out.println("Member Email Doesnt Exist");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 500
		}
		Member member = repo.findByEmail(request.getParameter("email"));
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		if ((member.getEmail().equals(request.getParameter("email")))
				&& (encoder.matches(request.getParameter("password"), member.getPassword()))) {
			System.out.println(
					"" + request.getParameter("email") + " " + request.getParameter("password") + " Accepted");
			return ResponseEntity.ok(member); // 200
		} else if ((member.getEmail().equals(request.getParameter("email")))
				&& (!member.getPassword().equals(request.getParameter("password")))) {
			System.out.println("" + request.getParameter("email") + " " + request.getParameter("password")
					+ " Incorrect Password");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

	}
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/members")
	public List<Member> getAllMembers() {
		List<Member> members = (List<Member>) repo.findAll();
		return members;
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/member/{id}")
	public Optional<Member> getUser(@PathVariable("id") long id) {
		return repo.findById(id);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value = "/member/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") int id) {
		Optional<Member> member = repo.findById((long) id);
		if (member.isPresent()) {
			repo.delete(member.get());
			return ResponseEntity.ok(HttpStatus.OK);
		} else {
			throw new RuntimeException("Member " + id + " could not be found");
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value = "/member")
	public ResponseEntity<HttpStatus> updateUser(HttpServletRequest request) {

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Member> memberOpt = repo.findById(Long.parseLong(request.getParameter("id")));
		System.out.println("A request was made "+request.getParameter("password")+" "+memberOpt.isPresent());
	
		if (memberOpt.isPresent()) {
			Member member = memberOpt.get();
			member.setFirstName(request.getParameter("firstname"));
			member.setLastName(request.getParameter("lastname"));
			member.setEmail(request.getParameter("email"));
			try{
			if(!(encoder.matches(request.getParameter("password"), member.getPassword()))) {
				System.out.println("Password updated");
				BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
				String encodedPassword = passwordEncoder.encode(request.getParameter("password"));				
				member.setPassword(encodedPassword);
			}}catch(Exception e) {

			}
			
			member.setRole(request.getParameter("role"));
			System.out.println(member.getEmail() + " " + member.getFirstName() + " " + member.getLastName() + " "
					+ member.getPassword() + " " + member.getId());
			repo.save(member);
		}
		return ResponseEntity.ok(HttpStatus.OK);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value = "/member")
	public ResponseEntity<HttpStatus> deleteUser(HttpServletRequest request) {

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		System.out.println(request.getParameter("id"));
		Optional<Member> memberOpt = repo.findById(Long.parseLong(request.getParameter("id")));
		if (memberOpt.isPresent()) {
			Member member = memberOpt.get();
			if (encoder.matches(request.getParameter("password"), member.getPassword())) {
				repo.deleteById(Long.parseLong(request.getParameter("id")));
				System.out.println("member Deleted");
				return ResponseEntity.status(HttpStatus.OK).body(null); // 200
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

	}

}
