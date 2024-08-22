package group13.app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.search.annotations.Boost;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import javax.validation.constraints.NotNull;

@Entity
@Indexed
@Table(name = "places")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)

public class Place implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Field()
    private String name;

    @NotNull
    @Field()
    private String type;

    @NotNull
    private float latitude;

    @NotNull
    private float longitude;

    @NotNull
    @Column(name = "postcode_district")
    @Field()
    @Boost(1.5f)
    private String postcodeDistrict;

    @Column(name = "populated_place")
    @Field()
    private String populatedPlace;

    @NotNull
    @Field()
    private String county;

    @NotNull
    @Field()
    private String region;

    @NotNull
    @Field()
    private String country;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public float getLatitude() {
        return latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public String getPostcodeDistrict() {
        return postcodeDistrict;
    }

    public String getPopulatedPlace() {
        return populatedPlace;
    }

    public String getCounty() {
        return county;
    }

    public String getRegion() {
        return region;
    }

    public String getCountry() {
        return country;
    }
}
