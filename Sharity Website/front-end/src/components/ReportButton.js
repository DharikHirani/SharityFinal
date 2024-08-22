import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Modal } from 'react-bootstrap';
import { PencilFill } from 'react-bootstrap-icons';
import UserContext from './context/UserContext';
import { useParams } from 'react-router-dom';
import AlertContext from './context/AlertContext';

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SUCCESS: 3,
});

export default function ReportButton({setLocation}) {
	const params = useParams();
	const [validated, setValidated] = useState(false);
	const [details, setDetails] = useState({ name: "", description: "" })
	const [show, setShow] = useState(false);
	const [status, setStatus] = useState(StatusEnum.INIT);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { userSignedIn, user } = useContext(UserContext);

	console.log(params)

	const createAlert = useContext(AlertContext);


	if (!userSignedIn || user.role === "member") return null;


	const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (event) => {
		const desc = `${details.description}`
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		setValidated(true);
		event.preventDefault();
		if (form.checkValidity() === true) {
			
		

			setStatus(StatusEnum.LOADING);

		
				const body = new FormData();
				body.append("reportMessage", desc);
				body.append("locationId", params.locationId);
				// body.append("locationName", location.name);
			
				console.log(body);
				fetch(`http://localhost:8080/reportNode`, {
				  method: "post",
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
				  });
			 
				

		}
	}


	return (
		<>
			<Button onClick={handleShow} variant="outline-primary" size="sm" className="ml-2"> Report</Button>

			<Modal
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Report Location</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={handleSubmit} >
					<Modal.Body>
						<Form.Group controlId="formBasicDescription">
							<Form.Control
								as="textarea" rows={5}
								required type="text"
								placeholder="Report message"
								name="description"
								value={details.description}
								onChange={handleChange}

							/>
						</Form.Group>
						<Col className="d-flex justify-content-between px-0">
							<Button variant="danger" onClick={handleClose} >
								Cancel
            </Button>
							<Button variant="success" type="submit" onClick={handleClose}>
								{status === StatusEnum.LOADING ? "Sending..." : "Send" }
							</Button>
						</Col>
					</Modal.Body>
				</Form>

			</Modal>
		</>

	)
}