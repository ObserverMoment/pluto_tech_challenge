export const capitalizeString = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

export const snakeCaseToDisplayString = (string: string) =>
	string
		.split('_')
		.map((s) => capitalizeString(s))
		.join(' ');

export const roundToDecimalPlaces = function (num: number, places: number) {
	const factor = 10 ** places;
	return Math.round(num * factor) / factor;
};
