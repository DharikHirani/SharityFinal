package group13.app.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import group13.app.model.Event;
import group13.app.model.NewsLetter;


public interface EventRepository extends JpaRepository<Event, Long>{	

	Event findByTitle(String title);
	
	public List<Event> findByLocationId(int locationId);
}
