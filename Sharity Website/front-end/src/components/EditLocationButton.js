import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Modal } from 'react-bootstrap';
import { PencilFill, ArrowRepeat } from 'react-bootstrap-icons';
import UserContext from './context/UserContext';
import { useParams } from 'react-router-dom';
import AlertContext from './context/AlertContext';

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SUCCESS: 3,
});

export default function EditLocationButton({ setLocation }) {
	const params = useParams();
	const [validated, setValidated] = useState(false);
	const [details, setDetails] = useState({ name: "", description: "" })
	const [show, setShow] = useState(false);
	const [status, setStatus] = useState(StatusEnum.INIT);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { userSignedIn, user } = useContext(UserContext);

	const createAlert = useContext(AlertContext);

	useEffect(() => {
		fetch(`http://localhost:8080/location/${params.locationId}`)
			.then((res) => res.json())
			.then((data) => {
				setDetails(data);
			})
			.catch(console.log);
	}, [])

	if (!userSignedIn || user.role === "member") return null;

	const reset = () => {
		fetch(`http://localhost:8080/location/${params.locationId}`)
			.then((res) => res.json())
			.then((data) => {
				setDetails(data);
			})
			.catch(console.log);
	}



	const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (event) => {
		const name = `${details.name}`
		const desc = `${details.description}`
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		setValidated(true);
		event.preventDefault();
		if (form.checkValidity() === true) {

			const body = new FormData();
			console.log(name, desc)
			body.append("name", name);
			body.append("description", desc);

			setStatus(StatusEnum.LOADING);

			fetch(`http://localhost:8080/location/edit/${params.locationId}`, {
				method: "PUT",
				body: body,
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data);
					setStatus(StatusEnum.SUCCESS);
					setLocation(data);
					createAlert("Location Edited", "success")
				})
				.catch(function (error) {
					console.log(error)
					setStatus(StatusEnum.INIT);
					createAlert("Error. Try again.", "danger");
				});

		}
	}


	return (
		<>
			<Button onClick={handleShow} variant="outline-primary" size="sm" className="ml-2 mb-1"><PencilFill /> Edit</Button>

			<Modal
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit Location Details</Modal.Title>
					<Col className="d-flex justify-content-between px-50">
						<Button onClick={reset} variant="outline-primary" size="sm" className="ml-2"><ArrowRepeat /> Reset</Button>
					</Col>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={handleSubmit} >
					<Modal.Body>
						<Form.Group controlId="formBasicName">
							<FormControl
								required type="text"
								placeholder="name"
								name="name"
								value={details.name}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicDescription">
							<Form.Control
								as="textarea" rows={9}
								required type="text"
								placeholder="description"
								name="description"
								value={details.description || ''}
								onChange={handleChange}
								maxLength={500}
							/>
							{details.description && (
								details.description.length == 500 ? (
									<div>
										Max of {details.description.length} characters have been reached.
									</div>
								) : (
									<div>{details.description.length} characters</div>
								)
							)}
						</Form.Group>
						<Col className="d-flex justify-content-between px-0">
							<Button variant="secondary" onClick={handleClose} >
								Cancel
            </Button>
							<Button variant="primary" type="submit" onClick={handleClose}>
								{status === StatusEnum.LOADING ? "Updating..." : "Confirm"}
							</Button>
						</Col>
					</Modal.Body>
				</Form>

			</Modal>
		</>

	)
}