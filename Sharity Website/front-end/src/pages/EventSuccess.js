import React from 'react';
import {Col, Row } from 'react-bootstrap';
export default function EventSuccess() {
	return (
    <Row className="h-100">
      <Col className="d-flex flex-column justify-content-center align-items-center pb-5">
				<h1>You have added a new Event!</h1>
				<div className="d-flex justify-items-stretch align-items-center pb-5 pt-3">
                    <h2>Click <a href="./events">here</a> to see your Event or return to <a href= "./"> homepage </a> </h2>
				</div>
			</Col>
    </Row>
  )
}