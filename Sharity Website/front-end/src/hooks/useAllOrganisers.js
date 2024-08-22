import { useEffect, useState } from "react";
import { onlyUniqueById } from "../helpers";

const useLocationsOrganisers = () => {
	const [organisers, setOrganisers] = useState([])

	useEffect(() => {
		fetch(`http://localhost:8080/organisers/with-locations`)
			.then((res) => res.json())
			.then((data) => setOrganisers(data))
			.catch(console.log);
	}, [])

	// useEffect(() => {
	// 	const uniqueOrganisers = locations.map((location) => location.organiser).filter(onlyUniqueById)
	// 	setOrganisers(uniqueOrganisers)
	// }, [locations])

	return organisers
}

export default useLocationsOrganisers