import React, { useContext, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertContext from '../context/AlertContext';
import OrganiserRequestDialog from './formComponents/OrganiserRequestDialog';
const eye = <FontAwesomeIcon icon={faEye} />;

const StatusEnum = Object.freeze({
	INIT: 1,
	LOADING: 2,
	SUCCESS: 3,
});

const initialFormData = ({
	orgname: "",
	orgaddress: "",
	orgaddress2: "",
	orgemail: "",
});

export default function SignUpOrgForm() {
	const [formData, updateFormData] = React.useState(initialFormData);
	const [validated, setValidated] = useState(false);
	const [orgpassword, setOrgpassword] = useState("");
	const [orgrpassword, setOrgrpassword] = useState("");
	const [showPassword, setShowPassword] = useState(true);
	const [showRpassword, setShowRpassword] = useState(true);
	const [status, setStatus] = useState(StatusEnum.INIT);
	const createAlert = useContext(AlertContext);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);

	if (status === StatusEnum.SUCCESS) {
		return <OrganiserRequestDialog show={show} />;
	}
	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim()
		});
	};

	const handlePassword = (e) => {
		setOrgpassword(e.target.value.trim())
	}

	const handleRPassword = (e) => {
		setOrgrpassword(e.target.value.trim())
	}

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
		event.preventDefault()
		console.log(formData);
		if (form.checkValidity() === true) {
			const body = new FormData();
			body.append("orgname", formData.orgname)
			body.append("orgaddress", formData.orgaddress)
			body.append("orgaddress2", formData.orgaddress2)
			body.append("orgemail", formData.orgemail)
			body.append("orgpassword", orgpassword)

			setStatus(StatusEnum.LOADING);

			fetch(`http://localhost:8080/organisersignup`, {
				method: 'post',
				body: body
			}).then(function (response) {
				return response.text();
			}).then(function (data) {
				console.log(data);
				setStatus(StatusEnum.SUCCESS);
				createAlert("Request Sent!", "success")
			}).catch(function (error) {
				console.error(error);
				setStatus(StatusEnum.INIT);
				createAlert("Error. Try again.", "danger");
			})
		}
		else if (orgpassword !== orgrpassword) {
			setStatus(StatusEnum.INIT);
			setValidated(false)
			createAlert("Password mismatch.", "danger");
		}
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit} >
			<Form.Group controlId="formBasicName">
				<Form.Label>Organisation name</Form.Label>
				<Form.Control required type="text" placeholder="Enter name" name="orgname" onChange={handleChange} />
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please enter organisation name.
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group controlId="formBasicAddress">
				<Form.Label>Address</Form.Label>
				<Form.Control required type="text" placeholder="Enter address" name="orgaddress" onChange={handleChange} />
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please enter organisation address.
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group controlId="formBasicAddress">
				<Form.Label>Address 2</Form.Label>
				<Form.Control type="text" placeholder="Enter address" name="orgaddress2" onChange={handleChange} />
			</Form.Group>

			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control required type="email" placeholder="Enter email" name="orgemail" onChange={handleChange} />
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please enter organisation email.
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<label>Password</label>
				<InputGroup className="mb-2">
					<Form.Control
						required
						type={showPassword === true ? "password" : "text"}
						placeholder="Password"
						value={orgpassword}
						onChange={handlePassword} />
					<InputGroup.Prepend>
						<InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
							{eye}
						</InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					<Form.Control.Feedback type="invalid">
						Please enter your password.
        </Form.Control.Feedback>
				</InputGroup>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<label>Repeat Password</label>
				<InputGroup className="mb-2">
					<Form.Control
						required
						type={showRpassword === true ? "password" : "text"}
						placeholder="Password again"
						value={orgrpassword}
						onChange={handleRPassword} />
					<InputGroup.Prepend>
						<InputGroup.Text onClick={() => setShowRpassword(!showRpassword)}>
							{eye}
						</InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					<Form.Control.Feedback type="invalid">
						Please repeat your password.
        </Form.Control.Feedback>
				</InputGroup>
			</Form.Group>

			<Form.Group controlId="formBasicCheckbox">
				<Form.Check required feedback="You must agree before submitting." type="checkbox" label="Accept some terms" />
			</Form.Group>

			<Button variant="primary" type="submit" className="w-100 mt-2" onClick={handleShow}>
				{status === StatusEnum.LOADING ? "Loading..." : "Sign Up"}
			</Button>
		</Form>
	)
}
