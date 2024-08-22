package group13.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import group13.app.model.NewsLetter;

@Repository
public interface NewsLetterRepository extends JpaRepository<NewsLetter, Long> {
	
	public List<NewsLetter> findByOrganiserId(long organiserId);

}
