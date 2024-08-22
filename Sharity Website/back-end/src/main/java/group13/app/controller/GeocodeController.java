package group13.app.controller;

import group13.app.model.Place;
import group13.app.model.Postcode;
import group13.app.repository.PlaceRepository;
import group13.app.repository.PostcodeRepository;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.util.List;

@RestController
@RequestMapping("/")
public class GeocodeController {
    @Autowired
    private PostcodeRepository postcodeRepo;

    @Autowired
    private PlaceRepository placeRepo;

    @Autowired
    private EntityManager entityManager;

    @GetMapping("/geocode/postcode/{postcode}")
    public List<Postcode> getPostcodeLatLon(@PathVariable(value = "postcode") String postcode) {
        postcode = postcode.strip();
        List<Postcode> postcodes = postcodeRepo.findFirst10ByPostcodeContaining(postcode);
        return postcodes;
    }

    @GetMapping("/geocode/place/{name}")
    public List<Place> getPlaceLatLon(@PathVariable(value = "name") String name) {
        name = name.strip();
        List<Place> places = placeRepo.findAllByNameContaining(name);
        return places;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/geocode/{term}")
    public List<Place> geocode(@PathVariable(value = "term") String term) {
        term = term.strip();

        System.out.println(term);

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        QueryBuilder queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Place.class)
                .get();

        org.apache.lucene.search.Query query = queryBuilder
                .keyword()
                .onFields("name", "type", "postcodeDistrict", "populatedPlace", "county", "region", "country")
                .matching(term)
                .createQuery();

        org.hibernate.search.jpa.FullTextQuery jpaQuery
                = fullTextEntityManager.createFullTextQuery(query, Place.class);

        List<Place> results = jpaQuery.setMaxResults(10).getResultList();

        return results;
    }
}
