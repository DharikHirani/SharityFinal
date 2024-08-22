import { useEffect, useState } from "react";

const useMapFilters = (locations, initFilters) => {
	const [filters, setFilters] = useState(initFilters);
	const [filteredLocations, setFilteredLocations] = useState(locations)

	useEffect(() => {
		setFilters(initFilters)
	}, [initFilters])

	useEffect(() => {
		setFilteredLocations(locations.filter((location) => {
			for (const filter of filters) {
				const { currentFilter, match, options } = filter;
				if (
					currentFilter > -1 &&
					!match({
						location,
						currentFilter,
						options
					})
				) return false;
			}
			return true;
		}))
	}, [locations, filters])

	const setFilter = (name, option) => {
		const filtersCopy = [...filters]
		const index = filtersCopy.findIndex((f) => f.name === name);
		filtersCopy[index].currentFilter = option.id;
		setFilters(filtersCopy);
	}

	return [filteredLocations, filters, setFilter]
}

export default useMapFilters;