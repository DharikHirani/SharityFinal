package group13.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import group13.app.model.Organiser;

import java.util.List;

public interface OrganiserRepository extends JpaRepository<Organiser, Long> {
	Organiser findByEmail(String email);

	@Query("SELECT o FROM Organiser o WHERE o.approved = true AND o.rejected = false")
	List<Organiser> findAllApproved();

	@Query("SELECT o FROM Organiser o WHERE o.approved = false AND o.rejected = false")
	List<Organiser> findAllPending();

	@Query("SELECT o FROM Organiser o WHERE o.approved = false AND o.rejected = true")
	List<Organiser> findAllRejected();
}