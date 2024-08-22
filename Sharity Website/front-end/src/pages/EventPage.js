
import React, { useEffect, useState } from "react";
import AddEvent from '../components/forms/AddEvent';
import SectionSmall from '../components/sections/SectionSmall';
import TitleSectionSmall from '../components/sections/TitleSectionSmall';

export default function EventPage() {

	const [location, setLocation] = useState([])

	useEffect(() => {
		fetch(`http://localhost:8080/location/{id}`)
		  .then((res) => res.json())
		  .then((data) => {
			setLocation(data);
			console.log(data);
		  })
		  .catch(console.log);
	  }, []);

	console.log('reload');
	return (
		<>
			<TitleSectionSmall>
				<h1 className="d-flex flex-column justify-content-center align-items-center pb-0">Add Event - {location.name}</h1>
			</TitleSectionSmall>
		<AddEvent />
		</>
	)
};