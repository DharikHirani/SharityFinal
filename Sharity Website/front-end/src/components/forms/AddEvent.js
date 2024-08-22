import { Modal } from 'react-bootstrap';
import React,{ useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AlertContext from '../context/AlertContext';
import { PencilFill, ArrowRepeat } from 'react-bootstrap-icons';
//import UserContext from "..components/context/UserContext";

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SUCCESS: 3,
});

const initialFormData = {
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: ""
  };
 
 export default function AddEvent( { locationId } ) {

  const [formData, updateFormData] = React.useState(initialFormData);
  const [validated, setValidated] = useState(false);
  const [status, setStatus] = useState(StatusEnum.INIT);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [details, setDetails] = useState({ title: "", description: "", date: "", startTime: "", endTime: ""});
  const params = useParams();
  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  const [show, setShow] = useState(StatusEnum.INIT);

  const createAlert = useContext(AlertContext);
  //const [locationId, setLocationId] = useState("");
  //const [location, setLocation] = useState()

  //const { user } = useContext(UserContext);  

  console.log(locationId);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  // const handleChangeTitle = (e) => {
  //   setTitle(e.target.value)
  //   };

  // const handleChangeDate = (e) => {
  //   setDate(e.target.value)
  // };

  // const handleDescription = (e) => {
  //  setDescription(e.target.value)
  // };

  // const handleStartTime = (e) => {
  //   setStartTime(e.target.value)
  // };

  // const handleEndTime = (e) => {
  //   setEndTime(e.target.value)
  // };
  
  function convertTime() {
  var dateInMilliSecs = new Date().getTime();
  }
 
  const handleSubmit = (event) => {
    const title = `${details.title}`
    const description = `${details.description}`
    const date = `${details.date}`
    const startTime = `${details.startTime}`
    const endTime = `${details.endTime}`
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // else if(form.checkValidity() === true){
    //     window.location.href='/eventadded';
    // }
    setValidated(true);
    event.preventDefault()
		console.log(formData);
    if(form.checkValidity()===true) {

      setStatus(StatusEnum.LOADING);

		const body = new FormData();
		body.append("title", title)
		body.append("description", description)
		body.append("date", date)
		body.append("startTime", startTime)
		body.append("endTime", endTime)
    body.append("locationId", params.locationId)
    console.log(formData.type)
    console.log(locationId)
  fetch(`http://localhost:8080/events/`, {
    method: "post",
    body: body,
    })
    .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        console.log(text);
        setStatus(StatusEnum.SUCCESS);
        createAlert("Event Added", "success")
      })
      .catch(function (error) {
        console.error(error);
        setStatus(StatusEnum.INIT);
        createAlert("Error. Try again.", "danger");
      });
    }
  };

  return (
    <>
    <Form noValidate validated={validated} onSubmit={handleSubmit} > 
        <Form.Group controlId="formBasicTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control required type="text" placeholder="Enter title" name="title" onChange={handleChange} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter event title.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label> 
            <Form.Control as= "textarea" rows={5} required type="text" placeholder="Enter description of event" name="description" onChange={handleChange} maxLength={500} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter description of event.
            </Form.Control.Feedback>

            {details.description.length == 500 ? (
                <div>
                  Max of {details.description.length} characters have been reached.
                </div>
              ) : (
                <div>{details.description.length} characters / 500</div>
              )}
        </Form.Group>
       
        <Form.Group controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control required type="date" placeholder="dd/mm/yyyy" name="date" onChange={handleChange} />
            <Form.Control.Feedback type="invalid">
              Please enter date of event.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicStartTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control type="time" placeholder="Start Time" name="startTime" onChange={handleChange} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEndTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control required type="time" placeholder="End Time" name="endTime" onChange={handleChange} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-2">
            Submit
        </Button>
    </Form>
    </>
  )  
}
