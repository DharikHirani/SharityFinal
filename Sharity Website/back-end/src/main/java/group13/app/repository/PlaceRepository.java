package group13.app.repository;

import group13.app.model.Place;
import group13.app.model.Postcode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    public List<Place> findFirst10ByNameContaining(String name);
    public List<Place> findAllByNameContaining(String name);
}
