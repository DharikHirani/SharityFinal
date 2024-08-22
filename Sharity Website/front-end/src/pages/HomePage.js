import React from 'react';
import { Button, Col, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<Row className="h-100 d-flex justify-content-center" style={{ background: "url('/sylvester-sabo-rrITI5_0XkE-unsplash.jpg')", backgroundPosition: "center -60px", backgroundSize: "cover" }}>
			<div className="d-flex flex-column justify-content-center pb-5" style={{ width: 1100 }}>
				<div style={{ background: "rgba(255,255,255,.4)", padding: 50 }}>
					<h1 className="mb-5" style={{ fontSize: '3.6em', fontWeight: 'bold' }}>Bringing communities and charities closer together</h1>

					<div className="d-flex align-items-stretch">
						<div className="w-100 d-flex flex-column justify-content-between">
							<div>
								<h2 style={{ fontWeight: "bold" }}>For people in need</h2>
								<p style={{ fontSize: "1.2em" }}>Find people and places providing the support you need</p>
							</div>
							<Link to="/map">
								<Button variant="primary">Search locations</Button>
							</Link>
						</div>

						<div className="w-100  d-flex flex-column justify-content-between">
							<div>
								<h2 style={{ fontWeight: "bold" }}>For volunteers</h2>
								<p style={{ fontSize: "1.2em" }}>Find charities and events to get involved with</p>
							</div>
							<Link to="/organisers">
								<Button variant="primary">Browse organisations</Button>
							</Link>
						</div>

						<div className="w-100 d-flex flex-column justify-content-between">
							<div>
								<h2 style={{ fontWeight: "bold" }}>For charities</h2>
								<p style={{ fontSize: "1.2em" }}>Communicate your mission and connect with volunteers</p>
							</div>
							<Link to="/sign-up">
								<Button variant="primary">Register your organisation</Button>
							</Link>
						</div>
					</div>
				</div>

				{/* <div className="d-flex justify-items-stretch align-items-center pb-5 pt-3">
					<Link to="/map">
						<Button variant="primary" className="w-100 mr-2">Search</Button>
					</Link>
					or
					<Link to="/location/add">
						<Button variant="outline-primary" className="ml-2">Add new location</Button>
					</Link>
				</div> */}
			</div>
		</Row >
	)
}
