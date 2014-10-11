/*
	Service responsible for transforming a drawing info into song informations
*/
const minRangeInterval = 0.01;

function _getRange (config, value) {
	var range = value - config.min ;

	// range between 0 and 1
	range = range / (config.max - config.min);

	// For medium values, the range is big. For extreme value, range is much larger (too prevent the no value effect in extrema)
	var rangeInterval = Math.max(minRangeInterval, Math.pow(2*((1 - range) - 0.5), 2) / 4);
	range = Math.min(range, 1 - rangeInterval);
	range = Math.max(range, 0 + rangeInterval);
	console.log(range);
	return [range - rangeInterval, range + rangeInterval];
}

function getTempoRange (drawing) {
	return _getRange(config.songify.drawingSpeed, drawing.avgSpeed).map(function (tempo) {
		return 50 + tempo * 200;
	});
}

function getDanceability (drawing) {
	return _getRange(config.songify.drawingDistance, drawing.distance);
}

function getEnergy (drawing) {
	return _getRange(config.songify.drawingSpeed, drawing.avgSpeed);
}


function getAcousticness (drawing) {
	return _getRange(config.songify.drawingSpread, drawing.spread).map((range) =>
		1 - range );
}

function getAcousticness (drawing) {
	return _getRange(config.songify.drawingSpread, drawing.spread);
}

module.exports = function (drawing) {
	return {
		tempoRange: getTempoRange(drawing),
		danceabilityRange: getDanceability(drawing),
		energyRange: getEnergy(drawing),
		acousticnessRange: getAcousticness(drawing)
	};
};