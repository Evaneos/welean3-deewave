/*
	Service responsible for transforming a drawing info into song informations
*/
const minRangeInterval = 0.01;

function _getRange (config, value) {
	// For medium values, the range is big. For extreme value, range is much larger (too prevent the no value effect in extrema)
	var rangeInterval = Math.max(minRangeInterval, Math.pow(2*((1 - value) - 0.5), 2) / 4);
	value = Math.min(value, 1 - rangeInterval);
	value = Math.max(value, 0 + rangeInterval);
	return [value - rangeInterval, value + rangeInterval];
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

// This is where the magic happens
function getMood (drawing) {
	var possibleMoods = [];
	// Small drawing with lot of intensity are angry
	if (drawing.spread < 0.5 && drawing.avgSpeed > 0.5 && drawing.distance > 0.5) {
		possibleMoods.push("angry");
	}
	// Large drawings relatively slow are happy
	if (drawing.spread > 0.5 && drawing.avgSpeed < 0.6) {
		possibleMoods.push("happy");
	}
	// small drawing relatively slow can be sad 
	if ( drawing.spread < 0.5 && drawing.avgSpeed < 0.5 && drawing.distance < 0.5) {
		possibleMoods.push("sad");
	}
	// large drawing relatively slow can be relaxing 
	if (drawing.spread < 0.6 && drawing.speed < 0.5  && drawing.distance > 0.4) {
		possibleMoods.push("relaxing");
	}
	// Large drawing with lot of speed can be excited
	if (drawing.spread > 0.5 && drawing.speed > 0.5 && drawing.distance > 0.5) {
		possibleMoods.push("excited");
	}
	return (possibleMoods.length)? possibleMoods[(Math.floor(Math.random() * possibleMoods.length))] : undefined;

}

// function getAcousticness (drawing) {
// 	return _getRange(config.songify.drawingSpread, drawing.spread).map((range) =>
// 		1 - range );
// }

function getAcousticness (drawing) {
	return _getRange(config.songify.drawingSpread, drawing.spread);
}

module.exports = function (drawing) {
	return {
		tempoRange: getTempoRange(drawing),
		danceabilityRange: getDanceability(drawing),
		energyRange: getEnergy(drawing),
		acousticnessRange: getAcousticness(drawing),
		mood: getMood(drawing) 
	};
};