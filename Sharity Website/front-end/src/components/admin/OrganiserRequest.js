import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Envelope, Link45deg, GeoAltFill, TelephoneFill } from "react-bootstrap-icons";

export default function OrganiserRequest({ organiser }) {
    const [state, setState] = useState({
        loading: false,
        success: false,
        accepted: false,
        rejected: false
    });

    console.log(organiser);

    const handleClick = (action) => {
        const body = new FormData();
        body.append("orgId", organiser.id);
        body.append("action", action);

        setState({ ...state, loading: true })

        fetch('http://localhost:8080/organiser/approve', {
            method: "post",
            body: body,
        })
            .then(() => {
                if (action === "accept") setState({ ...state, loading: false, success: true, accepted: true })
                if (action === "reject") setState({ ...state, loading: false, success: true, rejected: true })
            })
            .catch(console.log);
    }

    return (
        <Card className="rounded-0 mb-4">
            <Card.Body className="p-4 border-bottom">
                <Card.Title className="mb-0">{organiser.name}</Card.Title>
            </Card.Body>
            <Card.Body className="p-4 border-bottom">
                <Card.Text>
                    <GeoAltFill className="mr-2" /> {organiser.address}
                    <br />
                    {/* <TelephoneFill className="mr-2" /> +44 1895 274000
                    <br /> */}
                    <Link45deg className="mr-2" /> <a href={organiser.contactWebsite}>{organiser.contactWebsite}</a>
                    <br />
                    <Envelope className="mr-2" /> {organiser.email}
                </Card.Text>
            </Card.Body>
            {/* <Card.Body className="p-4 border-bottom">
                <Card.Text>
                    <small className="text-muted d-block pb-1">DESCRIPTION</small>
                    <span>
                        {organiser.description}
                    </span>
                </Card.Text>
            </Card.Body> */}
            <Card.Body className="p-4">
                {state.loading ? (
                    <Card.Text>Loading...</Card.Text>
                ) : (
                    state.success ? (
                        state.accepted ? (
                            <Card.Text>Organiser has been approved.</Card.Text>
                        ) : (
                            <Card.Text>Organiser has been rejected.</Card.Text>
                        )
                    ) : (
                        <div className="d-flex justify-content-between">
                            <Button variant="outline-primary" size="sm" onClick={() => handleClick("reject")}>Reject</Button>
                            <Button variant="primary" size="sm" onClick={() => handleClick("accept")}>Accept</Button>
                        </div>
                    )
                )}
            </Card.Body>
        </Card>
    )
}