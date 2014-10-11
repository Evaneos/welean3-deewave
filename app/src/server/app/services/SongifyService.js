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

function getDanceability (drawing) {
	return _getRange(drawing.distance);
}

function getEnergy (drawing) {
	return _getRange(drawing.avgSpeed);
}

// This is where the magic happens
function getMood (drawing) {
	var possibleMoods = [];
	// Small drawing with lot of intensity are angry
	if (drawing.spread < 0.5 && drawing.avgSpeed > 0.5 && drawing.distance > 0.5) {
		possibleMoods.push("angry");
	}
	// Large drawings relatively slow are happy
	if (drawing.spread > 0.5 && drawing.avgSpeed < 0.5) {
		possibleMoods.push("happy");
	}
	// small drawing relatively slow can be sad 
	if ( drawing.spread < 0.5 && drawing.avgSpeed < 0.5 && drawing.distance < 0.3) {
		possibleMoods.push("sad");
	}
	// large drawing relatively slow can be relaxing 
	if (drawing.spread < 0.6 && drawing.avgSpeed < 0.5 ) {
		possibleMoods.push("relaxing");
	}
	// Large drawing with lot of speed can be excited
	if (drawing.spread > 0.5 && drawing.avgSpeed > 0.5 && drawing.distance > 0.5) {
		possibleMoods.push("excited");
	}
	var choosenMood = (possibleMoods.length)? possibleMoods[(Math.floor(Math.random() * possibleMoods.length))] : undefined;
	console.log(possibleMoods, choosenMood);
	return choosenMood;

}

module.exports = function (drawing) {
	return {
		danceabilityRange: getDanceability(drawing),
		energyRange: getEnergy(drawing),
		mood: getMood(drawing) 
	};
};