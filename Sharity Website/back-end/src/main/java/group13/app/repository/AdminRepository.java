package group13.app.repository;

import group13.app.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	Admin findByEmail(String email);
}
