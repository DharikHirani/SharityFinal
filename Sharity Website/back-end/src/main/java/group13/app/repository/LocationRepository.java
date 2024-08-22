package group13.app.repository;

import group13.app.model.Organiser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import group13.app.model.Location;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Integer> {
	
    @Query("SELECT l FROM Location l WHERE (l.latitude BETWEEN :#{#w} AND :#{#e}) AND (l.longitude BETWEEN :#{#s} AND :#{#n})")
    public List<Location> findLocationsInBounds(@Param("s") float s, @Param("w") float w, @Param("n") float n, @Param("e") float e);

    public List<Location> findAllByOrganiser(Organiser organiser);
}
