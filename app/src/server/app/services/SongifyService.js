/*
	Service responsible for transforming a drawing info into song informations
*/
const minRangeInterval = 0.01;
const maxRangeInterval = 0.1;

function _getRange (value) {
	// For medium values, the range is big. For extreme value, range is much larger (too prevent the no value effect in extrema)
	var rangeInterval = Math.pow(2*((1 - value) - 0.5), 2) / 4;
	rangeInterval = Math.max(minRangeInterval, rangeInterval);
	rangeInterval = Math.min(maxRangeInterval, rangeInterval);
	value = Math.min(value, 1 - rangeInterval);
	value = Math.max(value, 0 + rangeInterval);
	return [value - rangeInterval, value + rangeInterval];
}

function getEnergy (drawing) {
	return _getRange(drawing.spread);
}
function getDanceability (drawing) {
	return _getRange(drawing.distance);
}
function getTempo (drawing) {
	return _getRange(drawing.avgSpeed).map((range) => 50 + range * 200);
}

module.exports = function (drawing) {
	return {
		energyRange: getEnergy(drawing),
		tempoRange: getTempo(drawing),
		danceabilityRange: getDanceability(drawing)
	};
};