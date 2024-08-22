import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MapContainer, TileLayer } from 'react-leaflet'
import AutocompleteAddNode from "../components/AutocompleteAddNode";
import LocationMarker from "./AddMarker";
import UserContext from "../components/context/UserContext";

const initialFormData = {
  nodename: "",
  type: "Food Bank"
};

export default function AddNode() {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [validated, setValidated] = useState(false);
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [info, setInfo] = useState({ street: "", postalCode: "", adminArea5: "" })
  const [description, setDescription] = useState("")


  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleChangeAddress = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescription = (e) => {
   setDescription(e.target.value)
  };

  const handleSubmit = (event) => {
    const address = `${info.street}, ${info.postalCode}, ${info.adminArea5}`
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      window.location.href = `/map`;
    }
    setValidated(true);
    event.preventDefault();
    console.log(formData);
    if (form.checkValidity() === true) {
    const body = new FormData();
    body.append("name", formData.nodename);
    body.append("latitude", lat);
    body.append("longitude", lng);
    body.append("address", address);
    body.append("description", description);
    body.append("type", formData.type);
    body.append("organiserId", user.id);
    console.log(formData.type)


    fetch("http://localhost:8080/location", {
      method: "POST",
      body: body,
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        console.log(text);
      })
      .catch(function (error) {
        console.error(error);
        console.log("error");
      });
    }
  };

  return (
    <React.Fragment>
      <Row className="h-100">
        <Col className="h-100 justify-content-left">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <div>
                &nbsp;
                </div>
              <h1>Add Location</h1>
              <div>
                &nbsp;
                </div>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter location name"
                name="nodename"
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a name.
        </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" name="type" onChange={handleChange} >
                <option>Food Bank</option>
                <option>Religious Institution</option>
                <option>Community Centre</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address: (Click Map)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="street name"
                name="street"
                value={info.street}
                onChange={handleChangeAddress}
              />
              <Form.Control
                required
                type="text"
                placeholder="postcode"
                name="postalCode"
                value={info.postalCode}
                onChange={handleChangeAddress}
              />
              <Form.Control
                required
                type="text"
                placeholder="city"
                name="adminArea5"
                value={info.adminArea5}
                onChange={handleChangeAddress}
              />
              <Form.Control.Feedback type="invalid">
                Please complete address by choosing from map or enter address yourself.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" rows={5}
                required type="text"
                placeholder="Enter description"
                value={description}
                onChange={handleDescription}
                maxLength={500} />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please add a description.
        </Form.Control.Feedback>
        {description.length == 500 ? (
                <div>
                  Max of {description.length} characters have been reached.
                </div>
              ) : (
                <div>{description.length} characters</div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-2">
              Submit
      </Button>
          </Form>
        </Col>
        <Col sm={8} className="h-100">
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
            <AutocompleteAddNode />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setInfo={setInfo} info={info} lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
          </MapContainer>
        </Col>
      </Row>
    </React.Fragment>
  );
}
//[51.505, -0.09]