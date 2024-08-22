package group13.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import group13.app.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Member findByEmail(String email);
}
