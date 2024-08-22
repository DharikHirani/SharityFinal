package group13.app.repository;

import group13.app.model.Postcode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostcodeRepository extends JpaRepository<Postcode, Long>{
    public List<Postcode> findByPostcodeContaining(String postcode);
    public List<Postcode> findFirst10ByPostcodeContaining(String postcode);
}

