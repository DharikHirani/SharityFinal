import { useEffect, useState } from "react";
import { areArraysEqual } from "../helpers";
import useMapBounds from "./useMapBounds";

const useMapLocations = (map, options = {}, fitMarkers) => {
  const [locations, setLocations] = useState(options.initLocations || []);
  const bounds = useMapBounds(map);

	useEffect(() => {
		if (map && options.initLocations) {
			console.log('fitMarkers', locations);
			fitMarkers(locations);
		}
	}, [map, options.initLocations])

	useEffect(() => {
		if (!map || !bounds) return;

		const [s, w, n, e] = bounds;
		console.log(bounds);

		fetch(`http://localhost:8080/locations/bounds/s/${s}/w/${w}/n/${n}/e/${e}`)
			.then((res) => res.json())
			.then((data) => {
				if (!areArraysEqual(locations, data)) {
					// console.log(data.map(location => location.id))
					console.log(data);
					setLocations(data);
				}
			})
			.catch(console.log);
	}, [map, bounds]);

  return locations;
};

export default useMapLocations;
