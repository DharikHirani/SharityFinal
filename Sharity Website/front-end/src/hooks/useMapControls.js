import { latLngBounds } from "leaflet";
import { useEffect, useState } from "react";

const useMapControls = (map) => {
	const [mapState, setMapState] = useState({});
	const [single, setSingle] = useState(null);

	// useEffect(() => {
	// 	if (single) {
	// 		zoomInToSingle(single.latitude, single.longitude);
	// 	}
	// }, [single]);

	const zoomInToSingle = (lat, lon) => {
		if (map == null) {
			return;
		}

		setMapState({
			center: map.getCenter(),
			zoom: map.getZoom(),
		});

		map.flyTo([lat, lon], 15, { animate: true, duration: 0.3 });
	};

	const zoomOutToAll = () => {
		if ("center" in mapState && "zoom" in mapState) {
			// @ts-ignore
			map.flyTo(mapState.center, mapState.zoom, { animate: true, duration: 0.3 });
		} else {
			map.setZoom(13, { animate: true });
		}
		setMapState({});
	};

	const fitMarkers = (markers) => {
		const bounds = latLngBounds(markers.latitude, markers.longitude)
		markers.forEach((marker) => {
			bounds.extend([marker.latitude, marker.longitude])
		})
		map.fitBounds(bounds, { animate: false });
	}

	return { zoomInToSingle, zoomOutToAll, setSingle, single, fitMarkers };
};

export default useMapControls;