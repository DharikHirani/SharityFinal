import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLocationsFilters from "../../hooks/useLocationsFilters";
import Filters from "../filter/Filters";
import LocationsList from "../LocationsList";

export default function OrganiserLocations({ organiser }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/organiser/${organiser.id}/locations`)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        console.log(data);
      })
      .catch(console.log);
  }, []);
  console.log(locations);

  const backTo = {
    text: `Back to ${organiser.name}`,
    path: `/organiser/${organiser.id}`,
  };

  const [initFilters, setInitFilters] = useState([
    {
      name: "Type",
      currentFilter: -1,
      options: [
        { id: -1, name: "All" },
        { id: 2, name: "Food Bank" },
        { id: 3, name: "Community Centre" },
        { id: 4, name: "Religious Institution" },
      ],
      match: ({ location, currentFilter, options }) =>
        location.eventType ===
        options.find((el) => el.id === currentFilter).name,
    },
  ]);

  const [filteredLocations, filters, setFilter] = useLocationsFilters(
    locations,
    initFilters
  );

  return (
    <Row className="d-flex justify-content-center">
      {locations.length > 0 ? (
        <>
          <Col lg={4} className="mb-3">
            <Card className="rounded-0 mb-3">
              <Card.Body>
                <Card.Text className="mb-0">
                  Organisation has {locations.length} registered locations.
                </Card.Text>
                <Filters filters={filters} setCurrentMapFilter={setFilter} />
              </Card.Body>
            </Card>
            <Link
              to={{
                pathname: `/map`,
                state: {
                  backTo: { ...backTo, single: false },
                  initLocations: locations,
                  filters: { organiser },
                },
              }}
            >
              <Button variant="primary" size="sm" className="w-100">
                Show all on the map
              </Button>
            </Link>
          </Col>
          <Col lg={8}>
            {filteredLocations.length > 0 ? (
              <Card className="rounded-0 border-top-0">
                <LocationsList
                  locations={filteredLocations}
                  backTo={{ ...backTo, single: true }}
                />
              </Card>
            ) : (
              <Card className="rounded-0">
                <Card.Body>
                  <Card.Text className="mb-0">
                    There are no locations matching your filters.
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </>
      ) : (
        <Col lg={12} className="mb-3">
          <Card className="rounded-0 mb-3">
            <Card.Body>
              <Card.Text className="mb-0">
                Organiser has no registered locations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
}
