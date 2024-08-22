import { useMap } from "react-leaflet";

const { useEffect, useState } = require("react");

const useMapBounds = (map) => {
	const getBounds = () => {
		const bounds = map.getBounds();

		const s = bounds._southWest.lng;
		const w = bounds._southWest.lat;
		const n = bounds._northEast.lng;
		const e = bounds._northEast.lat;

		return [s, w, n, e];
	};

	const [bounds, setBounds] = useState(null);

	useEffect(() => {
		if (map) {
			setBounds(getBounds());

			map.on("moveend", () => {
				const newBounds = getBounds();

				if (
					!bounds ||
					!(
						bounds[0] === newBounds[0] &&
						bounds[1] === newBounds[1] &&
						bounds[2] === newBounds[2] &&
						bounds[3] === newBounds[3]
					)
				) {
					setBounds(newBounds);
				}
			});
		}
	}, [map])

	return bounds;
}

export default useMapBounds;