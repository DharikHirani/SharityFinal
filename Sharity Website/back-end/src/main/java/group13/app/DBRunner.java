package group13.app;


import group13.app.model.*;
import group13.app.repository.*;

import java.sql.Date;
import java.sql.Time;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DBRunner implements CommandLineRunner {
    @Autowired
    private PostcodeRepository postcodeRepo;

    @Autowired
    private PlaceRepository placeRepo;

    @Autowired
    private LocationRepository locationRepo;

    @Autowired
    private MemberRepository memberRepo;


    @Autowired
    private OrganiserRepository orgRepo;

    @Autowired
    private AdminRepository adminRepo;
    
    @Autowired
    private NewsLetterRepository newsletterRepo;

    @Autowired
    private EventRepository eventRepo;
    
    @Autowired
    private ReportedNodesRepository reportedNodeReop;

    @Override
    public void run(String... args) throws Exception {
//        Postcode temp = postcodeRepo.findById(1L).orElse(null);
//        if (temp != null) {
//            System.out.println(temp.getPostcode());
//        }
//
//        List<Postcode> postcodes = postcodeRepo.findByPostcodeContaining("AB1 7N");
//
//        for (Postcode postcode : postcodes) {
//            System.out.println(postcode.getPostcode() + " " + postcode.getDistrict());
//       }
//
//        Place place = placeRepo.findById(1L).orElse(null);
//       if (place != null) {
//            System.out.println(place.getName());
//        }
    	
        createUser();
        populateLocations();
        addnewsLetter();
        //addEvents();   
        
        
        List<Location> location = (List<Location>) locationRepo.findAll();

        ReportedNodes newReport = new ReportedNodes();
        newReport.setReportMessage("Inappropriate language used");
        newReport.setLocation(location.get(0));
        reportedNodeReop.save(newReport);

        ReportedNodes newReport2 = new ReportedNodes();
        newReport2.setReportMessage("Organiser used fake locations");
        newReport2.setLocation(location.get(1));
        reportedNodeReop.save(newReport2);
        
    }
    
    public void addnewsLetter() {
        newsletterRepo.deleteAll();

        List<Organiser> organiser = orgRepo.findAll();

        NewsLetter newsletter1 = new NewsLetter();
        newsletter1.setOrganiser(organiser.get(0));
        newsletter1.setBody("<p><img src=\"https://hastingsvoluntaryaction.org.uk/sites/default/files/field/image/Foodbank-Parcel-single_WEB.jpg\" alt=\"\" width=\"1011\" height=\"674\" /></p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>&nbsp;</p>");
        newsletter1.setTitle("NewsLetter 1");
        newsletter1.setDateAndTimeAdded("22/02/2001 at 12:20 AM");
        newsletterRepo.save(newsletter1);

        NewsLetter newsletter2 = new NewsLetter();
        newsletter2.setOrganiser(organiser.get(0));
        newsletter2.setBody("<p><img src=\"https://hastingsvoluntaryaction.org.uk/sites/default/files/field/image/Foodbank-Parcel-single_WEB.jpg\" alt=\"\" width=\"1011\" height=\"674\" /></p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>&nbsp;</p>");
        newsletter2.setTitle("NewsLetter 2");
        newsletter2.setDateAndTimeAdded("22/09/2001 at 12:20 PM");
        newsletterRepo.save(newsletter2);
        
        NewsLetter newsletter3 = new NewsLetter();
        newsletter3.setOrganiser(organiser.get(1));
        newsletter3.setBody("<p><img src=\"https://hastingsvoluntaryaction.org.uk/sites/default/files/field/image/Foodbank-Parcel-single_WEB.jpg\" alt=\"\" width=\"1011\" height=\"674\" /></p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>\r\n" + 
        		"<p>&nbsp;</p>");
        newsletter3.setTitle("NewsLetter 3");
        newsletter3.setDateAndTimeAdded("22/07/2001 at 12:20pm");        
        newsletterRepo.save(newsletter3);


        List<NewsLetter> newsletters = newsletterRepo.findByOrganiserId(organiser.get(1).getId());
        
//        for (NewsLetter newsletter:newsletters) {
//            System.out.println("newsletter: "+newsletter.getBody());
//        }
    }
      
//    public void addEvent () {
//    	eventRepo.deleteAll();
//    	
//    	List<Location> locations = locationRepo.findAll();
//    	
//    	Event event = new Event();
//    	event.setLocation(locations.get(0));
//    	event.setTitle("Charity Fundraiser");
//    	event.setDescription("This is a description");
//    	event.setDate("20/03/2021");
//    	event.setStartTime("9:00");
//    	event.setEndTime("15:00");
//    	
//    	eventRepo.save(event);
//    	
//    	Event event2 = new Event();
//    	event2.setLocation(locations.get(1));
//    	event2.setTitle("March To Help");
//    	event2.setDescription("Another Description");
//    	event2.setDate("25/03/2021");
//    	event2.setStartTime("11:00");
//    	event2.setEndTime("17:00");
//    	
//    	eventRepo.save(event2);
//    	
//    	Event event3 = new Event();
//    	event3.setLocation(locations.get(2));
//    	event3.setTitle("Donate Food");
//    	event3.setDescription("Help To Distribute Food");
//    	event3.setDate("20/04/2021");
//    	event3.setStartTime("9:00");
//    	event3.setEndTime("18:00");
//    	
//    	eventRepo.save(event3);
//    	
//    	Event event4 = new Event();
//    	event4.setLocation(locations.get(0));
//    	event4.setTitle("March To Help");
//    	event4.setDescription("Another Description");
//    	event4.setDate("25/03/2021");
//    	event4.setStartTime("11:00");
//    	event4.setEndTime("17:00");
//    	
//    	eventRepo.save(event4);
//    }
    
    public void addEvents() {
    	eventRepo.deleteAll();
    
    List<Location> locations = locationRepo.findAll();
    	
    	Event[] events = {
    			new Event("Charity Fundraiser", "This is a description", "12/05/2021", "10:00", "13:30", locations.get(0)),
    			new Event("Donate Perishables", "Another Description", "03/04/2021", "09:00", "21:00", locations.get(0)),
    			new Event("Fundraiser", "Another Event", "03/04/2021", "10:00", "19:00", locations.get(1)),
    			new Event("Event 4", "Fourth Description", "18/05/2021", "11:00", "22:00", locations.get(2)),
    	};
    	
    	for (Event event : events) {
    		eventRepo.save(event);
    	}
    };

    public void populateLocations() {
        locationRepo.deleteAll();

        List<Organiser> organiser = orgRepo.findAll();

        Location[] locations = {
                new Location("Victoria Road", 51.546160F, -0.484030F,"Food Bank","example address",  "example desc", organiser.get(0)),
                new Location("Brunel University", 51.529820F, -0.454310F,"Community Centre","example address", "example desc", organiser.get(0)),
                new Location("Heathrow Airport", 51.4677389F, -0.4587801F,"Religious Institution","example address", "example desc", organiser.get(1))
        };

        for (Location location : locations) {
            locationRepo.save(location);
        }
    } 

    
    public void createUser() {
        memberRepo.deleteAll();
        orgRepo.deleteAll();
        adminRepo.deleteAll();


        // Same password for all test users
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode("password");

        Member member = new Member();

        member.setFirstName("Filip");
        member.setLastName("krawczyk");
        member.setEmail("fkrawczyk77@gmail.com");

        member.setFirstName("Member");
        member.setLastName("User");
        member.setEmail("member@user.com");

        member.setRole("member");

        member.setPassword(encodedPassword);
        memberRepo.save(member);
        
        Member member2 = new Member();
        member2.setFirstName("Filip");
        member2.setLastName("krawczyk 2");
        member2.setEmail("member2@user.com");
        member2.setRole("member");
        
        member2.setPassword(encodedPassword);
        memberRepo.save(member2);


        Organiser organiser = new Organiser();
        organiser.setName("Organiser");
        organiser.setEmail("organiser@user.com");
        organiser.setAddress("123 example street");
        organiser.setRole("organiser");
        organiser.setApproved(true);
        organiser.setRejected(false);
        organiser.setPassword(encodedPassword);
        organiser.setDescription("is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500sis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s");
        organiser.setContactEmail("someorganisation.org");
        organiser.setContactWebsite("https://www.google.co.uk/");
        orgRepo.save(organiser);
        
        Organiser organiser2 = new Organiser();
        organiser2.setName("Second Organiser");
        organiser2.setEmail("organiser2@user.com");
        organiser2.setAddress("124 example street");
        organiser2.setRole("organiser");
        organiser2.setApproved(true);
        organiser2.setRejected(false);
        organiser2.setPassword(encodedPassword);
        organiser2.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit, mauris ut finibus fermentum, dolor enim venenatis ipsum, vel laoreet erat nisl a nunc. Mauris tortor lorem, sodales porttitor ligula id, lobortis consectetur nunc. In sollicitudin est dapibus, rhoncus diam sit amet, scelerisque sapien.");
        organiser2.setContactEmail("organisation2.org");
        organiser2.setContactWebsite("https://org2.co.uk/");
        orgRepo.save(organiser2);

        Admin admin = new Admin();
        admin.setEmail("admin@user.com");
        admin.setRole("admin");
        admin.setPassword(encodedPassword);
        adminRepo.save(admin);

    }
}
