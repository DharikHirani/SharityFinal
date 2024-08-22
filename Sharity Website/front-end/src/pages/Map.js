import { MapContainer, TileLayer } from "react-leaflet";
import Autocomplete from "../components/Autocomplete";
import React, { useContext, useEffect, useState } from "react";
import ManageMarkers from "../components/map/ManageMarkers";
import { Button, Card, Col, Row } from "react-bootstrap";
import LocationsList from "../components/LocationsList";
import Filters from "../components/filter/Filters";
import { Link, Route, useRouteMatch } from "react-router-dom";
import LocationSingle from "../components/LocationSingle";
import useMapControls from "../hooks/useMapControls";
import useMapLocations from "../hooks/useMapLocations";
import useLocationsFilters from "../hooks/useLocationsFilters";
import BoolFilter from "../components/filter/BoolFilter";
import { isObjectEmpty } from "../helpers";
import { CaretLeftFill } from "react-bootstrap-icons";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { FaRegCaretSquareLeft, FaRegCaretSquareRight } from "react-icons/fa";
import UserContext from "../components/context/UserContext";
import useAllOrganisers from "../hooks/useAllOrganisers";

var center = [51.510357, -0.116773];

function App({ location }) {
  const { userSignedIn, user } = useContext(UserContext);
  const [options, setOptions] = useState(location.state || {});
  const match = useRouteMatch();
  const isSingle = !match.isExact;

  const [map, setMap] = useState(null);
  const {
    zoomInToSingle,
    zoomOutToAll,
    setSingle,
    single,
    fitMarkers,
  } = useMapControls(map);
  const locations = useMapLocations(map, options, fitMarkers);
  const organisers = useAllOrganisers();
  const [initFilters, setInitFilters] = useState([]);

  useEffect(() => {
    setInitFilters([
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
      {
        name: "Organiser",
        currentFilter:
          options.filters && options.filters.organiser
            ? options.filters.organiser.id
            : -1,
        options:
          options.filters &&
            options.filters.organiser &&
            organisers.length === 0
            ? [{ id: -1, name: "All" }, options.filters.organiser]
            : [{ id: -1, name: "All" }, ...organisers],
        match: ({ location, currentFilter }) =>
          location.organiser.id === currentFilter,
      },
      {
        name: "Saved",
        currentFilter: options.filters && options.filters.saved ? 0 : -1,
        options: [
          { id: -1, name: "All" },
          { id: 0, name: "Saved" },
        ],
        match: ({ location }) => location.userIds.includes(user.id),
        show: () => userSignedIn && user.role === "member",
        bool: true,
      },
    ]);
  }, [organisers, userSignedIn]);

  const [filteredLocations, filters, setCurrentMapFilter] = useLocationsFilters(
    locations,
    initFilters
  );

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      {showSidebar ? (
        <FaRegCaretSquareLeft
          className="hideArrow"
          onClick={() => setShowSidebar(!showSidebar)}
        ></FaRegCaretSquareLeft>
      ) : (
        <FaRegCaretSquareRight
          className="showArrow"
          onClick={() => setShowSidebar(!showSidebar)}
        ></FaRegCaretSquareRight>
      )}
      {/* <Button onClick={() => setShowSidebar(!showSidebar)}>Show/hide</Button> */}
      <Row className="h-100 d-flex justify-content-stretch">
        <div
          onClick={() => {
            showSidebar == false
              ? setShowSidebar(!showSidebar)
              : setShowSidebar(true);
          }}
          className={showSidebar ? "px-3 pb-3 pt-3 shadow" : "shadow-none"}
          style={{
            content: "normal",
            width: showSidebar ? 500 : 0,
            transition: "width .9s",
            background: showSidebar ? "white" : "grey",
            height: "100%",
            overflow: "auto"
          }}
        >
          <div className="mb-5">
            <Route path={`${match.path}/:locationId`}>
              <div
                style={{
                  display: showSidebar ? "block" : "none",
                }}
              >
                <LocationSingle
                  zoomOutToAll={zoomOutToAll}
                  setSingle={setSingle}
                  backTo={
                    options.backTo && options.backTo.single && options.backTo
                  }
                  state={options}
                />
              </div>
            </Route>

            <Route exact path={match.path}>
              {options.backTo && !options.backTo.single && (
                <Link to={options.backTo.path}>
                  <Button variant="primary" size="sm" className="mb-3">
                    <CaretLeftFill /> {options.backTo.text}
                  </Button>
                </Link>
              )}

              <Card
                className="rounded-0 mb-3"
                style={{ display: showSidebar ? "block" : "none" }}
              >
                <Card.Body>
                  <Card.Text className="mb-0">
                    We found {filteredLocations.length}{" "}
                    {filteredLocations.length == 1 ? "location" : "locations"}{" "}
                    in the area.
                  </Card.Text>

                  <Filters
                    filters={filters}
                    setCurrentMapFilter={setCurrentMapFilter}
                  />
                </Card.Body>
              </Card>

              <Card
                className="rounded-0 border-top-0"
                style={{ display: showSidebar ? "block" : "none" }}
              >
                <LocationsList
                  locations={filteredLocations}
                  setSingle={setSingle}
                  zoomInToSingle={zoomInToSingle}
                  state={options}
                />
              </Card>
            </Route>
          </div>
        </div>

        <div
          className="p-0 h-100 d-flex justify-content-center"
          style={{ flexGrow: 1 }}
        >
          {(!isSingle || (isSingle && single)) && (
            <MapContainer
              // @ts-ignore
              center={isSingle ? [single.latitude, single.longitude] : center}
              zoom={isSingle ? 15 : 12}
              scrollWheelZoom={true}
              whenCreated={setMap}
              bounds={null}
            >
              <Autocomplete />

              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup invalidateSize>
                <ManageMarkers locations={filteredLocations} setSingle={setSingle}
                  zoomInToSingle={zoomInToSingle}
                  state={options} />
              </MarkerClusterGroup>
            </MapContainer>
          )}
        </div>
      </Row>
    </>
  );
}

export default App;
