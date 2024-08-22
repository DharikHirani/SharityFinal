export const isObjectEmpty = (obj) => {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const areArraysEqual = (a, b) => {
	return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
};

export function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

export const onlyUniqueById = (value, index, self) => {
	return self.findIndex((element) => value.id === element.id) === index;
}