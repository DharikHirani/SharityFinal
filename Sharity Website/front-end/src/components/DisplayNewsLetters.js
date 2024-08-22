import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardImg, Col, Row } from "react-bootstrap";
import UserContext from "./context/UserContext";
import Event from "./Event";
import SubscribeNewsletterButton from "./SubscribeNewsletterButton";
// import { Link } from 'react-router-dom';
// import useLocationsFilters from '../../hooks/useLocationsFilters';
// import Filters from '../filter/Filters';
// import LocationsList from '../LocationsList';

export default function DisplayNewsLetter({ organiser }) {
  const [loading, setLoading] = useState(true);
  const [newsletters, setNewsLetters] = useState([]);
  const { user, userSignedIn } = useContext(UserContext);
  const [userSaved, setUserSaved] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8080/organiser/${organiser.id}/newsletters`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNewsLetters(data);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (userSignedIn && "subscriberIds" in organiser) {
      setUserSaved(organiser.subscriberIds.includes(user.id));
    }
  }, [organiser, userSignedIn, user]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <SubscribeNewsletterButton
        userSaved={userSaved}
        organiserId={organiser.id}
      />
      {newsletters.map((newsletter, index) => (
        <>
          <Card className="p-3">
            <Card.Title className="d-flex justify-content-center">
              {console.log(newsletter.title + " " + newsletter.title.lenght)}
              {newsletter.title.length === 0 ? (
                <h1>{organiser.name + "'s NewsLetter"}</h1>
              ) : (
                <h1>{newsletter.title}</h1>
              )}
            </Card.Title>
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <div style={{ width: "75%" }}></div>
            </div>
            <Card.Body>
              <p dangerouslySetInnerHTML={{ __html: newsletter.body }}></p>
            </Card.Body>
            <div className="d-flex justify-content-end">
              {newsletter.dateAndTimeAdded}
            </div>
          </Card>
          <br></br>
        </>
      ))}
    </div>
  );
}
